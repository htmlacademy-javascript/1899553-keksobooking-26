import { drawObjects } from './generator_card.js';
import { createObjects } from './data.js';
import { toActiveForm } from './form.JS';

toActiveForm();
drawObjects(createObjects());
