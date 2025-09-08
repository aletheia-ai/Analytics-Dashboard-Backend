import { Schema, Types } from 'mongoose';

export const PersonCountingSchema = new Schema({
  // footFall: Number,
  // Exit: Number,
  // age: Number,
  // gender: String,
  // occupancy: Number,
  store: { type: Types.ObjectId, ref: 'Store', required: true },
  enterCount: { type: Number, required: true },
  exitCount: { type: Number, required: true },
  maskCount: { type: Number, required: true },
  unMaskCount: { type: Number, required: true },
  maleCount: { type: Number, required: true },
});

/******
 * 
 * 
 * 
 * 
 * 
 *        "cameraId": str(self.dashboard_camera_id),
 * 
                            "enterCount": data.enter_count,
                            "exitCount": data.exit_count,
                            "date": data.count_date,
                            "time": data.count_time,
                            "maskCount": 0,
                            "unMaskCount": 0,
                            "maleCount": gender_counts.get("Male", 0),
                            "feMaleCount": gender_counts.get("Female", 0),
                            "child": age_counts.get('Child', 0),
                            "teen": age_counts.get('Teen', 0),
                            "adult": age_counts.get('Adult', 0),
                            "middle_age": age_counts.get('Middle_age', 0),
                            "old_age" : age_counts.get('Old_age', 0)
 * 
 * 
 * 
 * 
 */
