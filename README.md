# Lambda Function URL

This project is based on [Pulumi AWS Native Provider](https://github.com/pulumi/pulumi-aws-native) cloud provider and [AWS Cloud Control API](https://aws.amazon.com/cloudcontrolapi/).

## What

>[Announcing AWS Lambda Function URLs: Built-in HTTPS Endpoints for Single-Function Microservices](https://aws.amazon.com/blogs/aws/announcing-aws-lambda-function-urls-built-in-https-endpoints-for-single-function-microservices/).

![](https://d2908q01vomqb2.cloudfront.net/da4b9237bacccdf19c0760cab7aec4a8359010b0/2022/03/30/lambda-url-console-1024x321.png)

## Prerequisites

- [NodeJS v16](https://nodejs.org/en/)
- [Pulumi v3](https://www.pulumi.com)
- [AWS Credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)

## Usage

- `git clone git@github.com:mskutin/lambda-function-url.git`
- `pulumi up`

## API Gateway vs Lambda URL

|                        | [HTTP](https://docs.aws.amazon.com/apigateway/latest/developerguide/limits.html#http-api-quotas)  | [REST](https://docs.aws.amazon.com/apigateway/latest/developerguide/limits.html#api-gateway-execution-service-limits-table)  | LAMBDA URL |
|------------------------|-------|-------|------------|
| First 300 millions     | $1.25 | $4.25 | FREE       |
| Timeout                | 30    | 29    | 900        |
| Cloudwatch Log Message | 1MB   | 1MB   | N/A        |

>_*Singapore region_
