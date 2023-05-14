import { IsNotEmpty, IsNumberString, Length } from 'class-validator';
import { EqualsAny } from '~/src/common/decorator/EqualsAny';
import { IsNotSymbol } from '~/src/common/decorator/IsNotSymbol';
import { SortQuery } from '../common/helper/sort';
import { IntersectionType, PickType } from '@nestjs/mapped-types';

export class Village {
  @IsNotEmpty()
  @IsNumberString()
  @Length(10, 10)
  code: string;

  @IsNotEmpty()
  @IsNotSymbol("'()-./")
  @Length(3, 255)
  name: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(6, 6)
  districtCode: string;
}

export class VillageSortQuery extends SortQuery<'code' | 'name'> {
  @EqualsAny(['code', 'name'])
  sortBy: 'code' | 'name';
}

export class VillageFindQueries extends IntersectionType(
  PickType(Village, ['name'] as const),
  VillageSortQuery,
) {}

export class VillageFindByCodeParams extends PickType(Village, [
  'code',
] as const) {}
