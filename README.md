# LogOn 
My First fully functional authentication and authorization project. Built completely on MERN stack with Tailwind CSS

## How to run

### Prerequisites
1. Your MongoDB URI, you can get it by creating a MongoDB Atlas Database from here [MongoDB](https://account.mongodb.com/account/login)
2. JWT Secret Key, you can generate it from here [JWT](https://www.grc.com/passwords.htm) use 64 Random Hexadecimal Characters

### Steps
1. Clone the repository 
```bash
git clone https://github.com/kunalshah017/LogOn.git
```
2. Change the directory
```bash
cd LogOn
```

### For Windows
3. Setup using `Windows_Setup.ps1`
```powershell
.\Windows_Setup.ps1
```

`Going serial wise in setup steps is recommended`
`1. Setup Environment`
`2. Start Server`

4. When asked to select the option, select `1` and press `Enter`
5. When asked to enter the MongoDB URI, enter the URI or Right Click and Paste the URI and press `Enter`
6. When asked to enter the JWT Secret Key, enter the Key or Right Click and Paste the Key and press `Enter`

7. Again run the `Windows_Setup.ps1` and select `2` and press `Enter`
8. Click Here [LogOn](http://localhost:5173) to open the application

## Features
1. User Authentication
2. User Authorization
3. User Profile
4. User Logout
5. User Registration
6. User Login
7. User Account Deletion
