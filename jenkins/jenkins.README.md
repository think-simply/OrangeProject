# Jenkins Guide

- [Jenkins Guide](#jenkins-guide)
  - [Goals](#goals)
  - [Introduction to Jenkins](#introduction-to-jenkins)
    - [Benefits](#benefits)
    - [Jenkins vs GitHub Actions](#jenkins-vs-github-actions)
  - [How-to: Set up Jenkins in AWS server](#how-to-set-up-jenkins-in-aws-server)
    - [I. Create an IAM User](#i-create-an-iam-user)
    - [II. Create a key pair](#ii-create-a-key-pair)
    - [III. Create a Security Group](#iii-create-a-security-group)
    - [IV. Create an EC2 instance](#iv-create-an-ec2-instance)
    - [V. Install and Configure Jenkins](#v-install-and-configure-jenkins)
      - [Install Jenkins](#install-jenkins)
      - [Configure Jenkins](#configure-jenkins)
    - [VI. Configure Jenkins \& EC2](#vi-configure-jenkins--ec2)
      - [Install Git on EC2](#install-git-on-ec2)
      - [Create the first Jenkins job](#create-the-first-jenkins-job)
      - [Configure storage on EC2](#configure-storage-on-ec2)

## Goals

- Understanding the advantages of Jenkins in CI/CD pipeline
- Understanding how to set up Jenkins in AWS Server
- Understanding how to create and manage jobs on Jenkins

## Introduction to Jenkins

> Jenkins is an open-source automation server that has become a cornerstone of Continuous Integration and Continuous Delivery (CI/CD) pipelines. At its core, Jenkins automates the building, testing, and deployment of software projects.

### Benefits

- **Extensible**: A vast ecosystem of plugins allows for seamless integration with various tools and technologies in your development workflow.
- **Customizable**: Jenkins can be tailored to fit your specific needs, whether you're working on small projects or large-scale enterprise applications.
- **Reliable**: Jenkins has a proven track record of stability and reliability, ensuring that your builds and deployments run smoothly.
- **Community-driven**: A large and active community provides support, resources, and ongoing development.

### Jenkins vs GitHub Actions

Feature | Jenkins | GitHub Actions
------- | ------- | ----------
**Open Source** | Yes | No
**Self-hosted** | Yes | Yes (with limitations)
**Cloud-based** | No | Yes (with GitHub-hosted runners)
**Integration** | Extensive plugin system | Seamless with GitHub
**Learning Curve** | Steeper | Gentler
**Customization** | Highly | Less than Jenkins
**Scalability** | Requires manual effort | Automatically with GitHub-hosted runners
**Cost** | Free (open-source) | Free tier with usage-based pricing for private repos

## How-to: Set up Jenkins in AWS server

*Refer to https://dev.to/aws-builders/how-to-set-up-jenkins-and-a-pipeline-on-aws-2pak*

> **Prerequities**: Already registered AWS user

### I. Create an IAM User

1. Navigate to **IAM**
   ![alt text](image.png)
2. Navigate to **Users** > Click **Create user**
3. Enter user name, click **Next**
4. Under **Permission options**, select **Attach policies directly**
   ![alt text](image-1.png)
5. Click **Create policy**, choose **JSON**
6. Paste the following script in JSON policy editor:
    ```
      {
      "Version": "2012-10-17",
      "Statement": [
          {
              "Sid": "Stmt1312295543082",
              "Action": [
                  "ec2:DescribeSpotInstanceRequests",
                  "ec2:CancelSpotInstanceRequests",
                  "ec2:GetConsoleOutput",
                  "ec2:RequestSpotInstances",
                  "ec2:RunInstances",
                  "ec2:StartInstances",
                  "ec2:StopInstances",
                  "ec2:TerminateInstances",
                  "ec2:CreateTags",
                  "ec2:DeleteTags",
                  "ec2:DescribeInstances",
                  "ec2:DescribeInstanceTypes",
                  "ec2:DescribeKeyPairs",
                  "ec2:DescribeRegions",
                  "ec2:DescribeImages",
                  "ec2:DescribeAvailabilityZones",
                  "ec2:DescribeSecurityGroups",
                  "ec2:DescribeSubnets",
                  "iam:ListInstanceProfilesForRole",
                  "iam:PassRole",
                  "ec2:GetPasswordData"
              ],
              "Effect": "Allow",
              "Resource": "*"
          }
      ]
      }
    ```
7. Click **Next**
   ![alt text](image-2.png)
8. Set **Policy name** as `JenkinsEC2Policy`, click **Create policy**
9. Go back to **Create user** browser tab
10. Under **Permissions policies**, select permissions: `AmazonS3ReadOnlyAccess` and `JenkinsEC2Policy`
11. Click **Next** > click **Create user**.

### II. Create a key pair

1. Navigate to **EC2**
2. In the sidebar, under **Network & Security**, click **Key Pairs**
   ![alt text](image-3.png)
3. Click **Create key pair**
4. Set name as `Jenkins-Keypair`
5. Select `.pem` in **Private key file format**
   ![alt text](image-4.png)

### III. Create a Security Group

1. Navigate to **EC2** dashboard
2. Click **Security groups** > click **Create security group**
3. Set details as followed:
   - Security group name: `JenkinsSG`
4. Under **Inbound rules**, click **Add rule**
5. Add rules with the following details:
   - Type: `All trafic`, source: `Anywhere-IPv4`
   - Type: `SSH`, source: `Custom`, choose `com.amazonaws.<region>.ec2-instance-connect` from **Prefix lists** (replace `<region>` with region name, such as: `southeast-1`)
  ![alt text](image-6.png)
6. Under **Outbound rules**, click **Add rule**
7. Add rules with the following details:
   - Type: `All trafic`, destination: `Anywhere-IPv4`
8. Click **Create security group**

### IV. Create an EC2 instance

1. Navigate to **EC2** dashboard
2. Click **Launch instance**
3. Select as followed:
   - **Name**: `Jenkins`
   - **Application and OS Images**: `Amazon Linux`
   - **Instance type**: `t2.micro`
   - **Key pair**: select `Jenkins-Keypair` from dropdown
   - **Network settings**: select existing security group `JenkinsSG`
4. Click **Launch instance**
![alt text](image-7.png)
5. Click **Connect**
![alt text](image-5.png)
6. In **EC2 Instance Connect** tab, select **Connect using EC2 Instance Connect**, click **Connect**
![alt text](image-8.png)
7. Connection should be made in the new tab
![alt text](image-9.png)

### V. Install and Configure Jenkins

#### Install Jenkins

1. Execute the following command to ensure software packages are up-to-date:
   ```
   sudo yum update –y
   ```
2. Add Jenkins repo with following command:
   ```
   sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
   ```
3. Import a key file from Jenkins-CI to enable installation from the package:
   ```
   sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key
   sudo yum upgrade
   ```
4. Install Java:
   ```
   sudo dnf install java-21-amazon-corretto
   ```
5. Install Jenkins:
   ```
   sudo yum install jenkins -y
   ```
6. Enable Jenkins service to auto start at boot:
   ```
   sudo systemctl enable jenkins
   ```
7. Start Jenkins as a service:
   ```
   sudo systemctl start jenkins
   ```
8. Check the status of the Jenkins service using the command:
   ```
   sudo systemctl status jenkins
   ```
9. Restart *(if needed)* Jenkins during this setup/configuration:
   ```
   sudo systemctl restart jenkins
   ```

#### Configure Jenkins
1. Copy **Public IPv4 DNS** of EC2 instance, add suffix `:8080` and paste into the browser address bar. For example: `ec2-55-111-999-55.ap-southeast-1.compute.amazonaws.com:8080`
2. Go to EC2 Instance Connect tab, get the **initialAdminPassword** using the following command:
   ```
   sudo cat /var/lib/jenkins/secrets/initialAdminPassword
   ```
3. Go to Jenkins tab, paste the **initialAdminPassword**, click Continue
4. Click **Install suggested plugins**
   ![alt text](Arc_sqwsCU4WDe.png)
5. After installation completes, input new username and password in **Create First Admin User** popup, click **Save and Continue**
6. In **Instance Configuration** popup, click **Save and Finish** to proceed
7. Click **Start using Jenkins**
8. Click **Dashboard**, select **Manage Jenkins**, and then select **Plugins**
9. Click **Available plugins**, Search and Select **Amazon EC2** and then **Install**
    ![alt text](image-10.png)
10. Once installation completes, click **Dashboard**, select **Manage Jenkins**, click **Clouds**, click **New cloud**
11. Input name and select type: **Amazon EC2**
12. Under **Amazon EC2 Credentials**, click **Add**, select **Jenkins**
13. In **Jenkins Credentials Provider: Jenkins** popup, select **Kind** = **AWS Credentials**
14. Enter **Access Key ID**, **Secret Access Key** and Click **Add**:
    - In case you don't have access key yet, click your AWS username at top right of AWS dashboard
    - Click **Security credentials**
    - Click **Create access key**
      ![alt text](image-11.png)
    - Follow the steps, store access key in secure places
15. Select region
16. Click **Add** under **EC2 Key Pair's Private Key** and Select **Jenkins**
    - From the **Jenkins Credentials Provider: Jenkins**, select **SSH Username with private key** as the Kind and set the Username to `ec2-user`.
    - Select **Enter Directly** under Private Key, then select **Add**
    - Open the private key pair you created in the creating a key pair step and paste in the contents from -----BEGIN RSA PRIVATE KEY----- to -----END RSA PRIVATE KEY-----. Select **Add** when completed
17. Click Test Connection
    ![alt text](image-12.png)
18. Once connection is success, click **Save**.

### VI. Configure Jenkins & EC2

#### Install Git on EC2

1. In EC2 Console, run the system update:
   ```
   sudo dnf update
   ```
2. Install Git package for Amazon Linux:
   ```
   sudo dnf install git -y
   ```
3. Check if Git is installed:
   ```
   which git
   ```

#### Create the first Jenkins job

1. In Jenkins, navigate to **Dashboard**, click **New Item**
2. Name the item, select **Freestyle project**, click **OK**
3. Click **Source Code Management** tab, select **Git**
4. Paste Repo URL
5. Click **Build Triggers** tab, check **GitHub hook trigger for GITScm polling**
6. Convert .yml GitHub Actions file to Jenkinsfile, move the file to root directory
7. Click **Save**

#### Configure storage on EC2

1. In Jenkins, navigate to **Dashboard** > **Manage Jenkins** > **Nodes**
2. Check Free space: if you don't see any warnings, skip the following steps. If you do, proceed with the following steps:
   ![alt text](msedge_25-01-03_163927266.png)
3. Go to AWS, navigate to **EC2** > **Instances**, select your active instance
4. Click Storage tab, click Volume ID under Block devices
   ![alt text](msedge_25-01-03_164106845.png)
5. Select volume, click **Actions** > **Modify volume**
6. Change the size in GB, click **Modify**
   <br>***Tips**: Make sure to check AWS storage pricing model before increasing storage size at https://aws.amazon.com/ebs/pricing/?nc1=h_ls*
7. In the warning popup, click **Modify**
8. Wait until modifying process completes
9. Navigate to **Instances**, select active instance, click **Instance state** > **Reboot instance**