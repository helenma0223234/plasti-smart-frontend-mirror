<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>
</head>
<body>
  <script>
    async function loadModel() {
      const modelConfigResponse = await fetch('path/to/config.json');
      const modelConfig = await modelConfigResponse.json();
      const model = await tf.loadLayersModel(tf.io.fromMemory(JSON.stringify(modelConfig)));

      const weightsURL = 'path/to/saved_model.pb';
      const weightsBufferResponse = await fetch(weightsURL);
      const weightsBuffer = await weightsBufferResponse.arrayBuffer();

      await model.weights.forEach((weight, i) => {
        const weightValues = new Float32Array(weightsBuffer, i * 4, weight.shape.reduce((a, b) => a * b, 1));
        weight.assign(tf.tensor(weightValues, weight.shape));
      });

      console.log('Model loaded successfully:', model);
    }

    loadModel();
  </script>
</body>
</html>
