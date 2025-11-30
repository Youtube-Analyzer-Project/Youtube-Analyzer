# YouTube Analyzer – Local Development Guide

This project uses **Hadoop (HDFS)**, **Apache Spark**, **Django**, and **Angular**.  
Below is a quick reference for setting up and running the spark stack locally on macOS.

---

##  Environment Setup

### Java Versions
Spark requires **Java 17**, while Hadoop can run on **Java 11**.  
You can switch between them easily:

```bash
# Use Java 17 (recommended for Spark)
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
export PATH=$JAVA_HOME/bin:$PATH

# Use Java 11 (if needed for Hadoop)
export JAVA_HOME=$(/usr/libexec/java_home -v 11)
export PATH=$JAVA_HOME/bin:$PATH
```

Add aliases in ~/.zshrc:

Edit the .zshrc file with the command: ``` nano ~/.zshrc ``` then add this:
```bash
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
export PATH=$JAVA_HOME/bin:$PATH
export HADOOP_HOME=/usr/local/opt/hadoop/libexec
export PATH=$HADOOP_HOME/bin:$HADOOP_HOME/sbin:$PATH
```
CTRL + o to save and CTRL + x to exit

Reload your shell:

```bash
source ~/.zshrc
```

## Hadoop (HDFS)
### Initial Setup
```bash
# Format NameNode (only first time or after config changes)
hdfs namenode -format
```

### Start Daemons
```bash
hdfs namenode &
hdfs datanode &
hdfs secondarynamenode &
```
### Verify
```bash
jps   # should show NameNode, DataNode, SecondaryNameNode
```

### Create Working Directory
```bash
hdfs dfs -mkdir -p /youtube
hdfs dfs -chmod -R 777 /youtube
```

### Inspect Files
```bash
hdfs dfs -ls /
hdfs dfs -ls /youtube/raw_spark/trending
hdfs dfs -cat /youtube/raw_spark/trending/<timestamp>/part-00000 | head -20
```
### Web UI

NameNode UI: http://localhost:9870

### Spark

Make sure to change your Spark job to use localhost:9000 instead of hadoop-namenode:8020.

```python
spark = SparkSession.builder \
    .appName("YouTubeSparkIngestion") \
    .config("spark.hadoop.fs.defaultFS", "hdfs://localhost:9000") \
    .getOrCreate()
```

and update the output path:

```python
output_path = f"hdfs://localhost:9000/youtube/raw_spark/trending/{timestamp}"
```
Inside the hadoop-namenode container, run the following commands

These will create the comments and trending folders
and allow spark to create files inside them:
```bash 
hdfs dfsadmin -safemode leave
hdfs dfs -mkdir -p /youtube/raw_spark/trending
hdfs dfs -chmod -R 777 /youtube/raw_spark/trending

hdfs dfs -mkdir -p /youtube/raw_spark/comments
hdfs dfs -chmod -R 777 /youtube/raw_spark/comments
```
After editing, run:
```bash
spark-submit spark_jobs/youtube_spark_job.py
```
 If everything is correct, Spark will write the JSON file into ```/youtube/raw_spark/trending/<timestamp>``` inside your local HDFS. You can verify with:
```bash
hdfs dfs -ls /youtube/raw_spark/trending
```

