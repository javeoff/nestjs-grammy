import { ContextType } from '@nestjs/common';

import { CONTEXT_NAME } from '../utils';

export type TContextType = typeof CONTEXT_NAME | ContextType;
