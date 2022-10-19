## What is it?
This is a module to help to create PMO, Event, and R&D project record in NetSuite.


## Main Features
project: To create/update NetSuite SRP record.
issue: To query JIRA ticket information through the rest JIRA API


## Dependencies
jsonmapper.js

## Usage
Project record creation:
```bash
{
   "action":"create",
   "record":"pmojob",
   "id":"EVENT-1",
   "company": "83125",
   "subsidiary": "12",
   "jobtype": "Event",
   "projecttemplateid": "656521",
   "fields":{
      "companyname": "",
      "projectmanager": "zed.yap@servicerocket.com",
      "custentity4": "Operations"
   }
}
```
Project record update:
```bash
{
	"version":2.0,
	"action":"update",
	"record":"pmojob",
	"id":"EVENT-1"
}
```