# Desktop version CI/CD pipeline integration guide

# [:us: English](#english) | [:es: Español](#español)

## English

We created an **automatic integration process** to be able to develop the webapp locally, push the changes to my GitHub repository and then apply the changes into a **production environment** using the AWS EC2 instance. This guide walks you through this process in order for it to be easily integrated into any new web application with similar features.

### Table of contents

1. [New DuckDNS domain](#new-duckdns-domain)
2. [Connecting EC2 to GitHub Actions Runners](#connecting-ec2-to-github-actions-runners)
3. [Configuring Nginx for HTTP](#configuring-nginx)
4. [Requesting SSL certificate](#requesting-ssl-certificate)
5. [Configuring Nginx for HTTPS](#configuring-nginx-for-https)

### [Back to top](#ci-cd-pipeline-integration-guide)

### New DuckDNS domain

First things first, it is recommended to use [our AWS Cloudformation template](https://github.com/cmilsor245/plotscore/blob/main/.aws/cloudformation.yml) to create a new **AWS Stack**. This way you'll end up having all the resources needed to create our **desktop version** of the **plotscore project**.

This template will make sure you have an **EC2 instance**, a **Security Group**, an **Elastic IP Address** and a **RDS database instance**, all of them ready to use right away.

Once the AWS resources are created, you need to set up the domain name for our new web application. We will be using the domain name `plotscore--desktop.duckdns.org` in this guide.

![duckdns domain](readme-img/image.png)

#### [Back to english section](#english)

---

### Connecting EC2 to GitHub Actions Runners

The way the projects are connected between them and they work correctly is by using **environment variables** and **GitHub Actions secrets**, which makes it more secure in terms of using certain passwords and other credentials.

You now need to create those variables/secrets in the GitHub repository, just so [our GitHub Actions ***deploy*** workflow](https://github.com/cmilsor245/plotscore/blob/main/.github/workflows/deploy.yml) can use them to configure the app into a production environment inside our EC2 instance.

![github actions secrets](readme-img/image-2.png)

GitHub Actions needs to be able to connect to your EC2 instance in order to download the code inside the actual machine and deploy the projects. For that, you are going to need to creating a new GitHub Actions Runner. To get the GitHub Runner connected to an specific machine, execute the next commands displayed in the Actions/Runners tab in the GitHub repository settings page:

> [!NOTE]
> Once the last highlighted command is executed, you'll only set the new runner's name and skip the rest of the options.

![github actions runner commands](readme-img/image-3.png)

Without moving from the directory you are located in, use the command `sudo ./svc.sh install`, followed by the command `sudo ./svc.sh start` to make the Runner start automatically once a push to the repository is made.

![github actions runner idle status](readme-img/image-4.png)

Once the Runner is connected, you can make trigger a first build by pushing to the repository. The Runner will then get into Active mode and start using the GitHub Actions workflow to build and deploy the projects inside the EC2 instance.

#### [Back to english section](#english)

---

### Configuring Nginx for HTTP



#### [Back to english section](#english)

---

---

## Español

Hemos creado un proceso automático de integración para poder desarrollar las nuevas funcionalidades de la web localmente, hacer push de los cambios hacia mi repositorio en GitHub y aplicar dichos cambios en la instancia AWS EC2 en un **entorno de producción**. Esta guía muestra los pasos para llegar a dicho punto para que pueda ser fácilmente integrado en cualquier aplicación web de las mismas características.

### Índice

1. [Nuevo dominio DuckDNS](#nuevo-dominio-duckdns)
2. [Conectar EC2 a GitHub Actions Runners](#conectar-ec2-a-github-actions-runners)
3. [Configurar Nginx para HTTP](#configurar-nginx)
4. [Solicitar certificado SSL](#solicitar-certificado-ssl)
5. [Configurar Nginx para HTTPS](#configurar-nginx-para-https)

### [Volver arriba](#ci-cd-pipeline-integration-guide)

### Nuevo dominio DuckDNS

Primero, vamos a configurar el dominio para nuestra nueva aplicación web. Usaremos el dominio `plotscore--desktop.duckdns.org` en esta guía.

![dominio en duckdns](readme-img/image.png)

#### [Volver arriba](#español)

---

### Conectar EC2 a GitHub Actions Runners

#### [Volver arriba](#español)
