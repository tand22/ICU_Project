import json
import torch
from imv_lstm import IMVFullLSTM
from descriptors import descriptors


cpu = torch.device("cpu")
model = IMVFullLSTM(cpu, len(descriptors), 1, 128).to(cpu)
model.eval()
model.load_state_dict(torch.load("model_weights.pt", map_location=cpu))

def predict(event, context):
    try:
        body = json.loads(event['body'])

        X_example = torch.zeros((48, len(descriptors)))
        for record in body:
            try:
                hour = int(record[0][1])
                descriptor = record[1]
                value = float(record[2].strip('\n'))

                X_example[hour][descriptors.index(descriptor)] = value
            except ValueError:
                # Invalid descriptor
                continue

        x = torch.unsqueeze(X_example, dim=0)

        with torch.no_grad():
            output, a, b = model(x)

        mortality_percentage = torch.sigmoid(output).item()
        b = torch.squeeze(b).cpu().tolist()

        response = {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                "Content-Type": "application/json",
            },
            "body": json.dumps({
                "mortalityPercentage": mortality_percentage,
                "interpretation": {
                    "descriptors": descriptors,
                    "descriptorValues": b
                }
            })
        }

        return response
    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                "Content-Type": "application/json",
            },
            "body": json.dumps({"error": repr(e)})
        }