import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data: any, ctx) => {
  const request = ctx.switchToHttp().getRequest();

  if (!request.user) {
    return null;
  }

  if (data) {
    return request.user[data];
  }

  return request.user;
});
