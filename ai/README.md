# Serverless inference for the IMV-LSTM Model
https://arxiv.org/pdf/1905.12034.pdf

## Building

```
aws ecr get-login-password --region ap-southeast-2 | docker login --username AWS --password-stdin 375955733054.dkr.ecr.ap-southeast-2.amazonaws.com
```

```
docker build -t icu-mortality-prediction .
```

```
docker tag icu-mortality-prediction:latest 375955733054.dkr.ecr.ap-southeast-2.amazonaws.com/icu-mortality-prediction:latest
```

```
docker push 375955733054.dkr.ecr.ap-southeast-2.amazonaws.com/icu-mortality-prediction:latest
```

## Deployment

To deploy:

```
sls deploy
```

To destroy:

```
sls remove
```