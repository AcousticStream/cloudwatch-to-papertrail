# cloudwatch-to-papertrail
Lambda to send logs from Cloudwatch to Papertrail. Relays each message from the awslog data object.

```
{
    "owner": "123456789012",
    "logGroup": "CloudTrail",
    "logStream": "123456789012_CloudTrail_us-east-1",
    "subscriptionFilters": [
        "Destination"
    ],
    "messageType": "DATA_MESSAGE",
    "logEvents": [
        {
            "id": "31953106606966983378809025079804211143289615424298221568",
            "timestamp": 1432826855000,
            "message": "{\"eventVersion\":\"1.03\",\"userIdentity\":{\"type\":\"Root\"}"
        },
        {
            "id": "31953106606966983378809025079804211143289615424298221569",
            "timestamp": 1432826855000,
            "message": "{\"eventVersion\":\"1.03\",\"userIdentity\":{\"type\":\"Root\"}"
        },
        {
            "id": "31953106606966983378809025079804211143289615424298221570",
            "timestamp": 1432826855000,
            "message": "{\"eventVersion\":\"1.03\",\"userIdentity\":{\"type\":\"Root\"}"
        }
    ]
}
``` 


## Requires
• NodeJS & npm

## Usage

First, ensure an IAM role exists called `lambda_basic_execution`,
with the `AWSLambdaBasicExecutionRole` policy.

Next from within the source directory run the following:
```bash
$ export AWS_DEFAULT_REGION=us-east-1
$ export HOST=logs.papertrailapp.com PORT=1234
$ APP=helium PROGRAM=lambda LOG_GROUP=/aws/lambda/helium_transform make
```

To update existing lambda function:

```bash
$ export HOST=logs.papertrailapp.com PORT=1234
$ APP=helium PROGRAM=lambda make deploy
```

To stream another log group to already existing lambda:

```bash
$ export AWS_DEFAULT_REGION=us-east-1
$ APP=helium PROGRAM=lambda LOG_GROUP=/aws/lambda/helium_compose make log
```

Logs will be sent immediately to papertrail, at the expense of longer lambda execution times.

It's recommended to set Log Group to expire logs

*Note: Forked from https://github.com/apiaryio/cloudwatch-to-papertrail*

*Note: Helpful https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#LambdaFunctionExample*
