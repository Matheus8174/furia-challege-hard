import * as tf from '@tensorflow/tfjs-node';

import path from 'node:path';

import { createWorker } from 'tesseract.js';

import faceapi from '@vladmandic/face-api';

import { ValidateDocumentsSchema } from '../schemas/validate-documents';

const MODEL_PATH = path.join(
  import.meta.dirname,
  '..',
  '..',
  '..',
  '..',
  'public',
  'models'
);

const optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({
  minConfidence: 0.1,
  maxResults: 10
});

class ValidateDocuments {
  public async execute({ data, documents, selfie }: ValidateDocumentsSchema) {
    await this.loadModels();

    const worker = await createWorker('por', 1);

    const {
      data: { text }
    } = await worker.recognize(documents[1]);

    await worker.terminate();

    const nameMatch = text.includes(data.name.toUpperCase().trim());

    const cpfMatch = text.includes(data.cpf);

    if (!nameMatch) throw new Error('Name dont match');

    if (!cpfMatch) throw new Error('Cpf dont match');

    const [desc1, desc2] = await Promise.all([
      this.getDescriptors(selfie),
      this.getDescriptors(documents[0])
    ]);

    if (!desc1 || !desc2) throw new Error('can not find face in the image');

    const distance = faceapi.euclideanDistance(desc1, desc2);

    const selfmatch = distance < 0.6;

    if (!selfmatch) throw new Error('faces do not match');
  }
  private async loadModels() {
    await tf.ready();

    await Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_PATH),
      faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_PATH),
      faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_PATH)
    ]);
  }

  private async getDescriptors(buffer: Buffer) {
    const tensor = tf.node.decodeImage(buffer, 3);

    const face = await faceapi
      .detectSingleFace(tensor, optionsSSDMobileNet)
      .withFaceLandmarks()
      .withFaceDescriptor();

    tf.dispose(tensor);

    return face?.descriptor;
  }
}

export default ValidateDocuments;
