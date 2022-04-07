import * as awsnative from '@pulumi/aws-native';
import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

const role = new awsnative.iam.Role('role', {
  assumeRolePolicyDocument: {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'sts:AssumeRole',
        Principal: {
          Service: 'lambda.amazonaws.com',
        },
        Effect: 'Allow',
        Sid: '',
      },
    ],
  },
});

const lambdaRoleAttachment = new aws.iam.RolePolicyAttachment("lambdaRoleAttachment", {
  role: pulumi.interpolate`${role.roleName}`,
  policyArn: aws.iam.ManagedPolicy.AWSLambdaBasicExecutionRole,
});

const handler = `exports.handler = async (event) => {
    const response = {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html', charset: 'utf-8' },
      body: \`
<!DOCTYPE html>
  <html>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <style>
    a.center { text-align: center; }
    p.center { text-align: center; }
    table.center { width:70%; margin-left:15%; margin-right:15%
    }
    </style>
    <body>
      <table class="center responsive-table highlight">
        <tr>
          <th>Tool</th>
          <th>URL</th>
          <th>Support</th>
        </tr>
        <tr>
          <td>Redmine</td>
          <td><a href="https://qi.tools/redmine">https://qi.tools/redmine</a></td>
          <td><a href="https://www.pulumi.com/">Pulumi</a></td>
        </tr>
      </table>
      <p class="center"><a href="https://quantuminventions.com">© ${new Date().getFullYear()} Quantum Inventions</a></p>
      <p class="center">served by ƒ(ƛ) with ❤️</p>
    </body>
  </html>\`,
    };
    return response;
  };`;

const lambda = new awsnative.lambda.Function('function', {
  role: role.arn,
  
  handler: "index.handler",
  functionName: 'test-public-function',
  runtime: aws.lambda.NodeJS12dXRuntime,
  code: {
    zipFile: handler
  }

}, { dependsOn: role });

const url = new awsnative.lambda.Url('function-url', {
  authType: awsnative.lambda.UrlAuthType.None,
  targetFunctionArn: lambda.arn,
}, { dependsOn: lambda });

export const demo = {
  functionName: lambda.functionName,
  functionUrl: url.functionUrl
}

