// url:"/api/productiondetection/addLogs",
// method:"post",
// data:{
// "logs":"string",
//  "label":"pizza"  //"bottle",
// "status":"presence"//"absence",
// }

// import { PeopleCountingType } from '@src/utils/types/people-counting-type';
import { Schema, Types } from 'mongoose';

export const logSchema = new Schema(
  {
    logs: { type: String, required: false },
    label: { type: String, required: true, default: 'pizza' },
    status: { type: String, required: true, default: 'presence' },
  },
  { timestamps: true }
);
