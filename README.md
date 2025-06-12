# AWS Todo App
![Capture d’écran 2025-06-12 à 17 29 53](https://github.com/user-attachments/assets/01a9396d-08bc-46ab-84c6-546ac1eebbf1)


A simple, full-stack TODO list application built with Node.js, Express, and MySQL, designed to demonstrate AWS cloud infrastructure deployment with cost optimization principles.

## 🚀 Project Overview

This project showcases a complete AWS deployment using:
- **Frontend**: HTML, CSS, JavaScript (Single Page Application)
- **Backend**: Node.js with Express REST API
- **Database**: MySQL (AWS RDS)
- **Infrastructure**: AWS EC2 + RDS with Terraform IaC
- **Process Management**: PM2 for production deployment

## 🏗️ AWS Architecture


- **EC2 Instance**: `t2.micro` (Free Tier eligible)
- **RDS MySQL**: `db.t4g.micro` with Multi-AZ deployment
- **VPC**: Secure network isolation
- **Security Groups**: Proper firewall configuration

## ✨ Features

- ➕ **Add Tasks**: Create new todo items
- ✅ **Toggle Status**: Mark tasks as complete/incomplete
- ❌ **Delete Tasks**: Remove unwanted tasks
- 📱 **Responsive Design**: Works on desktop and mobile
- 🔒 **Secure Database**: Environment-based configuration
- 🚀 **Production Ready**: PM2 process management

## 🛠️ Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- MySQL database (local or AWS RDS)
- PM2 (for production deployment)

## 📦 Installation

### Local Development Setup

1. **Clone the repository**

2. **Install dependencies**: $ npm install

3. **Install dotenv for environment management**: $ npm install dotenv --save


4. **Create environment files**: npm install dotenv --save

For local development (`.env.local`)

For production (`.env.production`)


5. **Setup MySQL database**
CREATE DATABASE todos;
USE todos;
CREATE TABLE todo_list (
id INT AUTO_INCREMENT PRIMARY KEY,
task VARCHAR(255) NOT NULL,
status BOOLEAN DEFAULT FALSE
);


### 🚀 Running the Application

#### Local Development
$ npm install -g pm2
$ NODE_ENV=production pm2 start app.js --name "todoapp"
$ pm2 list
$ pm2 logs todoapp


## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Serve HTML frontend |
| GET | `/todo/` | Get all todos |
| POST | `/todo/` | Create a new todo |
| PUT | `/todo/` | Update a todo |
| DELETE | `/todo/:id/` | Delete a todo by ID |


## 🏗️ AWS Deployment Guide

This project is designed to test AWS RDS and EC2 integration with cost optimization in mind.

### Infrastructure Components

1. **VPC Setup**: Secure network isolation
2. **EC2 Instance**: Application server (`t2.micro`)
3. **RDS MySQL**: Database server (`db.t4g.micro`)
4. **Security Groups**: Firewall rules for ports 22, 80, 8000, 3306

### Deployment Steps

1. **Deploy infrastructure with Terraform**
2. **SSH into EC2 instance**
3. **Clone and setup application**
4. **Configure environment variables**
5. **Start with PM2**

### Cost Optimization Features

- ✅ **Free Tier Eligible**: `t2.micro` EC2 instance
- ✅ **Minimal RDS**: `db.t4g.micro` for cost efficiency
- ✅ **No NAT Gateway**: Public subnet deployment saves ~$45/month
- ✅ **Multi-AZ RDS**: High availability without extra compute costs
- ✅ **Efficient Security Groups**: Minimal attack surface


## 🎯 Use Cases

- **Learning AWS**: Hands-on experience with EC2 and RDS
- **Cost Optimization**: Demonstrate efficient resource usage
- **DevOps Practice**: Infrastructure as Code with Terraform
- **Full-Stack Development**: Complete application deployment
- **Production Deployment**: PM2 process management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feat/new-feature`)
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original tutorial by [Yogasaikrishna](https://github.com/yogasaikrishna/todo-app)
- AWS documentation and best practices
- PM2 community for excellent process management tools

## 📞 Support

For questions about AWS deployment or cost optimization, please open an issue in this repository.

---

**Built with ❤️ for AWS learning and cost optimization**


