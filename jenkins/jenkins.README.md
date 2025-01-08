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
    - [V. Install and Integrate Jenkins with EC2](#v-install-and-integrate-jenkins-with-ec2)
      - [Install Jenkins](#install-jenkins)
      - [Integrate Jenkins with EC2](#integrate-jenkins-with-ec2)
    - [VI. Configure Jenkins \& EC2](#vi-configure-jenkins--ec2)
      - [Install Git on EC2](#install-git-on-ec2)
      - [Configure nodes on Jenkins](#configure-nodes-on-jenkins)
      - [Add Node.js plugin to Jenkins](#add-nodejs-plugin-to-jenkins)
      - [Check and increase swap size on EC2](#check-and-increase-swap-size-on-ec2)
      - [Grant sudo priviledges to Jenkins user](#grant-sudo-priviledges-to-jenkins-user)
      - [Create the first Jenkins Pipeline job](#create-the-first-jenkins-pipeline-job)
    - [VII. Understanding \& Writing Jenkinsfile](#vii-understanding--writing-jenkinsfile)
      - [Understanding Jenkinsfile](#understanding-jenkinsfile)
      - [How-to: Convert GitHub Actions YAML to Jenkinsfile](#how-to-convert-github-actions-yaml-to-jenkinsfile)

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
   ![alt text](images/image.png)
2. Navigate to **Users** > Click **Create user**
3. Enter user name, click **Next**
4. Under **Permission options**, select **Attach policies directly**
   ![alt text](images/image-1.png)
5. Click **Create policy**, choose **JSON**
6. Paste the following script in JSON policy editor:
    ```json
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
                  "ec2:GetPasswordData"
              ],
              "Effect": "Allow",
              "Resource": "*"
          }
      ]
      }
    ```
7. Click **Next**
   ![alt text](images/image-2.png)
8. Set **Policy name** as `JenkinsEC2Policy`, click **Create policy**
9. Go back to **Create user** browser tab
10. Under **Permissions policies**, select permissions: `AmazonS3ReadOnlyAccess` and `JenkinsEC2Policy`
11. Click **Next** > click **Create user**.

### II. Create a key pair

1. Navigate to **EC2**
2. In the sidebar, under **Network & Security**, click **Key Pairs**
   ![alt text](images/image-3.png)
3. Click **Create key pair**
4. Set name as `Jenkins-Keypair`
5. Select `.pem` in **Private key file format**
   ![alt text](images/image-4.png)

### III. Create a Security Group

1. Navigate to **EC2** dashboard
2. Click **Security groups** > click **Create security group**
3. Set details as followed:
   - Security group name: `JenkinsSG`
4. Under **Inbound rules**, click **Add rule**
5. Add rules with the following details:
   - Type: `All trafic`, source: `Anywhere-IPv4`
   - Type: `SSH`, source: `Custom`, choose `com.amazonaws.<region>.ec2-instance-connect` *(the one without `ipv6`)* from **Prefix lists** (replace `<region>` with region name, such as: `southeast-1`)
  ![alt text](images/msedge_25-01-06_150602661.png)
6. Under **Outbound rules**, click **Add rule**
7. Add rules with the following details:
   - Type: `All trafic`, destination: `Anywhere-IPv4`
8. Click **Create security group**

### IV. Create an EC2 instance

1. Navigate to **EC2** dashboard
2. Click **Launch instance**
3. Select as followed:
   - **Name**: `Jenkins`
   - **Application and OS Images**: `Ubuntu`
   - **Instance type**: `t2.micro`
   - **Key pair**: select `Jenkins-Keypair` from dropdown
   - **Network settings**: select existing security group `JenkinsSG`
   - Increase storage *(max: 30GB in free tier)* if needed
4. Click **Launch instance**
![alt text](images/image-7.png)
5. Click **Connect**
![alt text](images/image-5.png)
6. In **EC2 Instance Connect** tab, select **Connect using EC2 Instance Connect**, click **Connect**
![alt text](images/image-8.png)
7. Connection should be made in the new tab
![alt text](images/image-9.png)

### V. Install and Integrate Jenkins with EC2

#### Install Jenkins

1. Execute the following command to ensure software packages are up-to-date:
   ```
   sudo apt update
   sudo apt upgrade -y
   ```
2. Add Jenkins repo with following command:
   ```
   curl -fsSL https://pkg.jenkins.io/debian/jenkins.io-2023.key | sudo tee \
   /usr/share/keyrings/jenkins-keyring.asc > /dev/null
   ```
   ```
   echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
   https://pkg.jenkins.io/debian binary/ | sudo tee \
   /etc/apt/sources.list.d/jenkins.list > /dev/null
   ```
3. Install Java:
   ```
   sudo apt install openjdk-21-jdk -y
   java -version
   ```
4. Install Jenkins:
   ```
   sudo apt update
   sudo apt install jenkins -y
   ```
5. Enable Jenkins service to auto start at boot:
   ```
   sudo systemctl enable jenkins
   ```
6. Start Jenkins as a service:
   ```
   sudo systemctl start jenkins
   ```
7. Check the status of the Jenkins service using the command:
   ```
   sudo systemctl status jenkins
   ```
8. Restart *(if needed)* Jenkins during this setup/configuration:
   ```
   sudo systemctl restart jenkins
   ```

#### Integrate Jenkins with EC2

1. Copy **Public IPv4 DNS** of EC2 instance, add suffix `:8080` and paste into the browser address bar. For example: `ec2-55-111-999-55.ap-southeast-1.compute.amazonaws.com:8080`
2. Go to EC2 Instance Connect tab, get the **initialAdminPassword** using the following command:
   ```
   sudo cat /var/lib/jenkins/secrets/initialAdminPassword
   ```
3. Go to Jenkins tab, paste the **initialAdminPassword**, click Continue
4. Click **Install suggested plugins**
   ![alt text](images/Arc_sqwsCU4WDe.png)
5. After installation completes, input new username and password in **Create First Admin User** popup, click **Save and Continue**
6. In **Instance Configuration** popup, click **Save and Finish** to proceed
7. Click **Start using Jenkins**
8. Click **Dashboard**, select **Manage Jenkins**, and then select **Plugins**
9. Click **Available plugins**, Search and Select **Amazon EC2** and then **Install**
    ![alt text](images/image-10.png)
10. Once installation completes, click **Dashboard**, select **Manage Jenkins**, click **Clouds**, click **New cloud**
11. Input name and select type: **Amazon EC2**
12. Under **Amazon EC2 Credentials**, click **Add**, select **Jenkins**
13. In **Jenkins Credentials Provider: Jenkins** popup, select **Kind** = **AWS Credentials**
14. Enter **Access Key ID**, **Secret Access Key** and Click **Add**:
    - In case you don't have access key yet, click your AWS username at top right of AWS dashboard
    - Click **Security credentials**
    - Click **Create access key**
      ![alt text](images/image-11.png)
    - Follow the steps, store access key in secure places
15. Select region
16. Click **Add** under **EC2 Key Pair's Private Key** and Select **Jenkins**
    - From the **Jenkins Credentials Provider: Jenkins**, select **SSH Username with private key** as the Kind and set the Username to `ubuntu`.
    - Select **Enter Directly** under Private Key, then select **Add**
    - Open the private key pair you created in the creating a key pair step and paste in the contents from -----BEGIN RSA PRIVATE KEY----- to -----END RSA PRIVATE KEY-----. Select **Add** when completed
17. Click Test Connection
    ![alt text](images/image-12.png)
18. Once connection is success, click **Save**.

### VI. Configure Jenkins & EC2

#### Install Git on EC2

1. In EC2 Console, run the system update:
   ```
   sudo apt update
   ```
2. Install Git package for Amazon Linux:
   ```
   sudo apt install git -y
   ```
3. Check if Git is installed:
   ```
   git --version
   ```

#### Configure nodes on Jenkins

1. In Jenkins, navigate to **Dashboard** > **Manage Jenkins** > **Nodes**
2. Click **Built-In Node**, click Status in sidebar
3. In case the node is offline due to insufficent storage, go back to **Nodes**
4. Click **Configure Monitors**, check **Don't mark agents temporarily offline** then click **Save**
   ![alt text](images/msedge_25-01-06_104941256.png)

#### Add Node.js plugin to Jenkins

> For reference, go to https://github.com/thanhbinhbent/playwright-jenkins

1. In Jenkins, navigate to **Dashboard** > **Manage Jenkins** > **Plugins**
2. Click Available plugins in the sidebar, search for `NodeJS`
3. Select and click **Install**
4. Navigate to **Manage Jenkins** > **Tools**
5. Scroll down to **NodeJS installations**, click **Add NodeJS**
6. Input a name, e.g. `NodeJS`, check **Install automatically**, select version, click **Save**

#### Check and increase swap size on EC2

1. In EC2 console, run the following command to check current swap space:
   ```
   free -h
   ```
   ![alt text](images/msedge_25-01-06_143016326.png)
2. If swap space is 0B, then run command to make a large file *(e.g. 2GB)*:
   ```
   sudo dd if=/dev/zero of=/swapfile bs=1M count=2048
   ```
3. Next, format the file as a swap partition:
   ```
   sudo mkswap /swapfile
   ```
4. Enable the swap file:
   ```
   sudo swapon /swapfile
   ```
5. Open file `/etc/fstab`:
   ```
   sudo nano /etc/fstab
   ```
6. Add the following line to the file then save and exit:
   ```
   /swapfile none swap sw 0 0
   ```
7. Lastly, enable swap:
   ```
   sudo swapon -a
   ```
8. Restart Jenkins service *(if running)*

#### Grant sudo priviledges to Jenkins user

1. In EC2 console, add the Jenkins user to the sudoers group:
   ```
   sudo usermod -aG sudo jenkins
   ```
2. Make sure the Jenkins user has sudo priviledges without password:
   ```
   echo "jenkins ALL=(ALL) NOPASSWD: ALL" | sudo tee /etc/sudoers.d/jenkins
   ```
3. Restart Jenkins service *(if running)*

#### Create the first Jenkins Pipeline job

1. In Jenkins, navigate to **Dashboard**, click **New Item**
2. Name the item, select **Pipeline**, click **OK**
3. Under **Build Triggers**, check **GitHub hook trigger for GITScm polling**
4. Click **Pipeline** tab in the sidebar, select **Pipeline script from SCM** in **Definition** dropdown
5. Select **Git** in **SCM** dropdown
6. Paste repository link in **Repository URL**
7. Define branch name under **Branches to build**
   ![alt text](images/msedge_25-01-06_111756023.png)
8. Input `Jenkinsfile` in **Script Path**
9.  Click **Save**
10. In the Git branch specified above, create a file named `Jenkinsfile` and put it in the root directory

Before learning about how to create Jenkinsfile in the next section, here's what a pipeline stages diagram looks like in Jenkins:
![alt text](images/msedge_25-01-07_113818289.png)

### VII. Understanding & Writing Jenkinsfile

#### Understanding Jenkinsfile

> A Jenkinsfile is a text file that defines a Jenkins pipeline as code. It's written in a Groovy-like syntax and allows you to describe your entire build, test, and deployment process in a declarative or scripted manner.

- **Stages**: Represent distinct phases of the pipeline (e.g., Build, Test, Deploy).
- **Steps**: Individual tasks within a stage (e.g., running commands, checking out code).
- **Agents**: Define where the pipeline will be executed (e.g., on the Jenkins master, on a specific node).
- **Parameters**: Allow you to pass parameters to the pipeline.

#### How-to: Convert GitHub Actions YAML to Jenkinsfile

1. **Event Triggers**:<br>
   `GitHub Actions YAML`
   ```yaml
   on:
      push:
         branches: [ main ]
      pull_request:
         branches: [ main ]
   ```
   `Jenkinsfile`
   ```groovy
   triggers {
      pollSCM('H/15 * * * *') // Run every 15 minutes for every hour
      githubPush()  // Requires GitHub plugin
   }
   ```
2. **Environment Variables**:<br>
   `GitHub Actions YAML`
   ```yaml
   env:
      NODE_ENV: production
      API_KEY: ${{ secrets.API_KEY }}
   ```
   `Jenkinsfile`
   ```groovy
   environment {
      NODE_ENV = 'production'
      API_KEY = credentials('api-key-credential-id')
   }
   ```
3. **Matrix Strategy**:<br>
   `GitHub Actions YAML`
   ```yaml
   strategy:
      matrix:
         node-version: [14.x, 16.x, 18.x]
   ```
   `Jenkinsfile`
   ```groovy
   matrix {
      axes {
         axis {
               name 'NODE_VERSION'
               values '14', '16', '18'
         }
      }
      stages {
         stage('Test') {
               steps {
                  sh "nvm use ${NODE_VERSION}"
                  sh 'npm test'
               }
         }
      }
   }
   ```
4. **Parallel Jobs**:<br>
   `GitHub Actions YAML`
   ```yaml
   jobs:
      test:
         runs-on: ubuntu-latest
         strategy:
            matrix:
               test-group: [unit, integration]
   ```
   `Jenkinsfile`
   ```groovy
   stage('Test') {
      parallel {
         stage('Unit Tests') {
               steps {
                  sh 'npm run test:unit'
               }
         }
         stage('Integration Tests') {
               steps {
                  sh 'npm run test:integration'
               }
         }
      }
   }
   ```
5. **Conditional Steps**:<br>
   `GitHub Actions YAML`
   ```yaml
   if: github.ref == 'refs/heads/main'
   ```
   `Jenkinsfile`
   ```groovy
   when {
      branch 'main'
   }
   ```
6. **Artifacts**:<br>
   `GitHub Actions YAML`
   ```yaml
   - uses: actions/upload-artifact@v2
     with:
       name: my-artifact
       path: dist/
   ```
   `Jenkinsfile`
   ```groovy
   stage('Archive') {
      steps {
         archiveArtifacts artifacts: 'dist/**/*'
      }
   }
   ```
7. **Node Setup**:<br>
   `GitHub Actions YAML`
   ```yaml
   - uses: actions/setup-node@v2
     with:
       node-version: '16'
   ```
   `Jenkinsfile`
   ```groovy
   tools {
      nodejs 'Node 16'  // Configured in Jenkins Tool Configuration
   }
   ```

**Full example:**<br>
`GitHub Actions YAML`
```yaml
name: Node.js CI/CD
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      NODE_ENV: production
    strategy:
      matrix:
        node-version: [14.x, 16.x]
    
    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v2
      with:
        node-version: ${{ matrix.node-version }}
    - name: Install dependencies
      run: npm ci
    - name: Run tests
      run: npm test
    - name: Build
      run: npm run build
    - name: Upload artifact
      uses: actions/upload-artifact@v2
      with:
        name: build-files
        path: build/
```
`Jenkinsfile`
```groovy
pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS'
    }
    
    environment {
        NODE_ENV = 'production'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build and Test') {
            matrix {
                axes {
                    axis {
                        name 'NODE_VERSION'
                        values '14', '16'
                    }
                }
                stages {
                    stage('Setup') {
                        steps {
                            sh "nvm install ${NODE_VERSION}"
                            sh "nvm use ${NODE_VERSION}"
                        }
                    }
                    stage('Install') {
                        steps {
                            sh 'npm ci'
                        }
                    }
                    stage('Test') {
                        steps {
                            sh 'npm test'
                        }
                    }
                    stage('Build') {
                        steps {
                            sh 'npm run build'
                        }
                    }
                }
            }
        }
        
        stage('Archive') {
            steps {
                archiveArtifacts artifacts: 'build/**/*'
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
    }
}
```