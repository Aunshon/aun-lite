import { createSlotFill, SlotFillProvider } from "@wordpress/components";
const { Slot, Fill } = createSlotFill('aun-test-slot-fill');

export function SlotFillContainer(props) {
	return (
			<Slot/>
	);
};

SlotFillContainer.Fill = ({children}) => <Fill>{children}</Fill>;
