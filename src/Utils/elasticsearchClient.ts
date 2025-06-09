import { Client } from '@elastic/elasticsearch';

const esclient = new Client({ node: 'http://localhost:9200' });

export default esclient;
