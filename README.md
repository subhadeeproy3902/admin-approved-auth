# 🚀 Admin Approval Auth System

This is a simple yet powerful authentication system that requires admin approval for users with Manager and Employee roles. It's designed with security in mind, ensuring that all passwords remain safe and encrypted. Perfect for use cases such as payroll management systems and other business applications where controlled access is essential.

## 🛠️ Features

- **Admin, Manager, and Employee Roles**:

  - 🛡️ Admin: The only user with full control, manually set in the MongoDB database.

  - 👥 Manager & Employee: Can register but need admin approval before accessing the dashboard.

- **Approval System**:

  - 📩 Pending Approval: Managers and employees are added to the database upon registration but can't access the system until approved.

  - ✅ Approval/Rejection: Admin can approve or reject users. Rejected users can re-register.

- **Security**:

  - 🔒 Passwords are securely encrypted.

  - 🔑 Potential for future enhancements like Two-Factor Authentication and OAuth Providers.

## 📊 Use Case Scenarios

This template can be utilized in various scenarios, including but not limited to:

- 🏢 **Company Payroll Management Systems**: Ensuring that only approved personnel can access sensitive payroll data.

- 🗂️ **Project Management Tools**: Restricting access to specific project roles until approved by an admin.

- 🧑‍💼 **Employee Management Systems**: Managing access to employee records and sensitive HR data.

## ⚙️ Setup Instructions

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/subhadeeproy3902/admin-approved-auth.git
    cd admin-approved-auth
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Set up MongoDB**:
    - Create a MongoDB database and add the admin user manually.

4. **Run the Application**:
    ```bash
    npm start
    ```

5. **Environment Variables**:
   - Make sure to configure your environment variables (e.g., MongoDB URI, secret keys) in a `.env` file.

   ```
   DATABASE_URL="your_mongo_connection_string"
   EMAIL_PW="email_password_for_sending_emails"
    ```

## 🖼️ Screenshots

| | | 
|:-------------------------:|:-------------------------:|
|<img width="1604" alt="1" src="https://i.postimg.cc/4y5C1bK7/Screenshot-61.png">  |  <img width="1604" alt="2" src="https://i.postimg.cc/Z5Wg9hLy/Screenshot-62.png"> |
|<img width="1604" alt="3" src="https://i.postimg.cc/qq8KDg0C/Screenshot-63.png">|  <img width="1604" alt="4" src="https://i.postimg.cc/rFZyXMmd/Screenshot-65.png">
|<img width="1604" alt="5" src="https://i.postimg.cc/6QYYzjzN/Screenshot-66.png">  |  <img width="1604" alt="6" src="https://i.postimg.cc/dQdScBVG/Screenshot-67.png">|

## 🚀 Future Enhancements

- 🔐 **Two-Factor Authentication**: Enhance security by adding an extra layer of protection.
- 🌍 **Auth Providers**: Integrate with external providers like Google, GitHub, etc.

## 🌟 Contributing

Feel free to fork this project and customize it according to your needs. If you found this template useful, please consider giving it a ⭐ on GitHub!
