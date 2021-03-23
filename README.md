# Reactivities
Activity Management

Its a sample project using .NET Core 5 for API and react for the clinet side. 
This project can use for Activity management. 

Below are the list of technology and methods used in this project:

* CQRS pattern with MediatR
* .NET Core 5
* Code-First approach
* react for the Client side
* SignalR

# Getting start with .Net Core
Build any .NET Core sample using the .NET Core CLI, which is installed with [the .NET Core SDK](https://www.microsoft.com/net/download).

## Prerequisites

Entity Framework Core Tools for the .NET

```console
dotnet tool install --global dotnet-ef --version 5.0.4
```

For imaage handling create account in https://cloudinary.com/. 
Add the details in appsettings.json 

example: 
```console
"Cloudinary" : {
    "CloudName": "abcdefghi",
    "ApiKey": "123456789123456",
    "ApiSecret": "iM2439-203430230"
  }
```

## Usage
In the API folder run the command below
```console
dotnet build
dotne run
```
