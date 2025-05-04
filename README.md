# BhojanSetu


## API Endpoints

### Food Availability
- **Get list of unclaimed food availability in some radius near me**  
    **GET**

- **Post food availability with its location (longitude, latitude) and estimate of people for food**  
    **POST**

- **Claim Request for food availability**  
    **PUT**

- **Get all claim requests for one food availability**  
    **GET**

- **Approve food availability claim request**  
    **PATCH**

### NGOs
- **Get a list of NGOs working on food distribution**  
    **GET**

- **Direct Notification for some explicit NGOs**  
    **POST**

### Notifications
- **List of all Notifications (Claim request approvals or direct notification to be claimed)**  
    **GET**

### User Management
- **Send OTP to mobile number**  
    **POST**

- **User registration - mobile number with OTP verification**  
    **POST**

- **Login with password**  
    **POST**

- **Logout**  
    **POST**

### Optional Features
- **Direct Message for 48 hours**  
    *(Optional)*

- **SSO for login**  
    *(Optional)*