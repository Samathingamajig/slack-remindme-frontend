import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Popconfirm, Space, notification, Alert } from 'antd';
import useModal from '../hooks/useModal';
import moment, { Moment, unix } from 'moment';
import Modal from 'antd/lib/modal/Modal';
import { useUpdateReminderMutation } from '../generated/graphql';

(window as any).moment = moment;

const RescheduleReminder: React.FC<{
    reminderId: string;
    postAt: number;
}> = ({ reminderId, postAt }) => {
    const [date, setDate] = useState<Moment | null>(unix(postAt).seconds(0));
    const [isValidDate, setIsValidDate] = useState<boolean>();
    const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { isOpen, open, close } = useModal();
    const [updateReminder] = useUpdateReminderMutation();

    const onChangeDate = (tDate: Moment | null, _tDateString: string) => {
        setDate(tDate);
    };

    const isAValidDate = (date: Moment | null | undefined, justDate?: boolean): boolean => {
        if (justDate) {
            const start = date?.clone().hours(0).minutes(0).seconds(0).milliseconds(0);
            const end = date?.clone().hours(23).minutes(59).seconds(59).milliseconds(999);
            return isAValidDate(start) || isAValidDate(end);
        }
        if (!date) return false;
        return date.isSameOrAfter(moment().add(1, 'minute')) && date.isBefore(moment().add(120, 'days'));
    };

    useEffect(() => {
        setIsValidDate(!unix(postAt).seconds(0).isSame(date) && isAValidDate(date));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);

    const isDisabled = isDatePickerOpen || !isValidDate;

    return (
        <>
            <Button onClick={open} type="primary">
                Reschedule
            </Button>
            <Modal
                visible={isOpen}
                onCancel={close}
                title={'When would you like to be reminded?'}
                footer={
                    <Space>
                        <Button onClick={close}>Cancel</Button>
                        <Popconfirm
                            title={`Are you sure you want to reschedule this reminder to ${date?.format(
                                'MM-DD-YYYY @ hh:mm A',
                            )}`}
                            placement="topRight"
                            onConfirm={async () => {
                                setIsLoading(true);
                                const response = await updateReminder({
                                    variables: { id: reminderId, postAt: date!.unix() },
                                });
                                setIsLoading(false);
                                if (response.errors || response.data?.updateReminder.errors) {
                                    let errors: any[] = [];
                                    if (response.errors) errors = [...errors, ...response.errors];
                                    if (response.data?.updateReminder.errors)
                                        errors = [...errors, ...response.data?.updateReminder.errors];
                                    notification.open({
                                        type: 'error',
                                        placement: 'bottomRight',
                                        message: 'An error occurred while rescheduling',
                                        description: JSON.stringify(errors),
                                    });
                                    return;
                                }
                                close();
                            }}
                            disabled={isDisabled}
                        >
                            <Button type="primary" disabled={isDisabled} loading={isLoading}>
                                Reschedule
                            </Button>
                        </Popconfirm>
                    </Space>
                }
            >
                <DatePicker
                    onChange={onChangeDate}
                    onOpenChange={(open) => setIsDatePickerOpen(open)}
                    showTime={true}
                    use12Hours={true}
                    showSecond={false}
                    showNow={true}
                    allowClear={false}
                    format={'MM-DD-YYYY @ hh:mm A'}
                    placeholder={'Select date and time'}
                    size={'large'}
                    value={date}
                    disabledDate={(other) => {
                        return !isAValidDate(other, true);
                    }}
                />
                {!isValidDate && (
                    <Alert
                        message="Date error"
                        description="The selected date must be different and be placed within 120 days in the future"
                        type="warning"
                        showIcon
                    />
                )}
            </Modal>
        </>
    );
};

export default RescheduleReminder;
