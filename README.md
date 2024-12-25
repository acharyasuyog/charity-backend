# CHARITY-APP-BACKEND

## Usages

1. Open terminal
2. git clone https://github.com/acharyasuyog/charity-backend.git [ctrl & ctrl+v]
3. cd CHARITY-BACKEND [ctrl & ctrl+v]
4. npm install [ctrl & ctrl+v]
5. npm run dev [ctrl & ctrl+v]

Kudos 🎉🎉. Good to go now 👏🏽👏🏽. Test api using postman.

## API DESCRIPTION

```perl
POST : /api/v1/auth/register

payload: {
   username: "suyognotnice@gmail.com"
  password:"Test@123"
}

****** -> Response  <- *******
onSuccess: {
  message: 'Register succesfull !!',
 email:"suyognotnice@gmail.com"
}
onFailure: {
  message: 'Register failed !!',
  token: null,
}
```

```perl
POST : /api/v1/auth/login

payload: {
   username: "suyognotnice@gmail.com"
  password:"Test@123"
}

****** -> Response  <- *******
onSuccess: {
  message: 'Login succesfull !!',
 email:"suyognotnice@gmail.com"
token:"s23241sfsdf.ad34fdsfdsdf.34sfgsfsfsfsd"
}
onFailure: {
  message: 'Login failed !!',
  token: null,
}
```

## Donation

```
POST : api/v1/donation


payload: {
  userId:"retrieved from token",
  amount: 100,
  campaignId: "5f7b4b3b7f3b3b3b3b3b3b3b",
  paymentId: "esewa/khalti id",
  status: "success" // pending, success, failed
}

****** -> Response  <- *******
onSuccess: {
  message: 'Donation successfull !!',
  amount: 100,
  campaignId: "5f7b4b3b7f3b3b3b3b3b3b3b",
  paymentId: "esewa/khalti id",
  status: "success"
}

onFailure: {
  message: 'Donation failed !!',
  status: "failed"
}

```
```
GET : api/v1/donation

payload: {
  userId:"retrieved from token",
}

****** -> Response  <- *******
onSuccess: {
  message: 'Donation successfull !!',
  amount: 100,
  campaignId: "5f7b4b3b7f3b3b3b3b3b3b3b",
  paymentId: "esewa/khalti id",
  status: "success"
}

onFailure: {
  message: 'Donation failed !!',
  status: "failed"
}

```

```
GET : api/v1/donation/:campaignId

payload: {
  userId:"retrieved from token",
}

****** -> Response  <- *******

onSuccess: {
  message: 'Donation successfull !!',
  amount: 100,
  campaignId: "5f7b4b3b7f3b3b3b3b3b3b3b",
  paymentId: "esewa/khalti id",
  status: "success"
}

onFailure: {
  message: 'Donation failed !!',
  status: "failed"
}

```

```
