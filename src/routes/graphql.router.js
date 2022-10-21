import { Router } from 'express';
import { graphqlHTTP } from 'express-graphql';
import graphql from '../graphQL/graphQL.js';

const router = Router();

router.use('/', graphqlHTTP(graphql.graphqlOptions));

export default router;
