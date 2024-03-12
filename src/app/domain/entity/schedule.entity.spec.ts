import { ScheduleEntity } from "./schedule.entity"

describe('ScheduleEntity', () => {
  it('should restore schedule correct values', () => {
    const input = { schedule_id: 1, schedule_status: 'SCHEDULED', bullet_code: '2023-01-02T16:00', type_service: 'appointment' };
    const output = new ScheduleEntity(1, 'SCHEDULED', '2023-01-02T16:00', 'appointment');

    expect(ScheduleEntity.restore(input)).toEqual(output);
  });

  it('should restore schedule id empty and receive message scheduel not exist', () => {
    const input = {} as any;
    expect(() => ScheduleEntity.restore(input)).toThrowError('Schedule has error');
  });
})
