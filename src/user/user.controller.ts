import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Crud({
    model: { type: UserEntity },
})

@Controller('user')
export class UserController implements CrudController<UserEntity>{
    constructor(public service: UserService) {}
    get base(): CrudController<UserEntity> {
        return this;
      }
    @Override()
    createOne(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: UserEntity,
    ) {
        const user = this.service.getUserByName(dto)
        if(user) throw new HttpException(
            'User already exist in system',
            HttpStatus.FOUND,
        );
        return this.base.createOneBase(req, dto);
    }
}
