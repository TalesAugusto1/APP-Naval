import React from 'react';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from '@gluestack-ui/themed';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  snapPoint?: number;
}

export function BottomSheet({ isOpen, onClose, children, snapPoint = 0.9 }: BottomSheetProps) {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} snapPoints={[snapPoint * 100]}>
      <ActionsheetBackdrop />
      <ActionsheetContent maxHeight={`${snapPoint * 100}%`}>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        {children}
      </ActionsheetContent>
    </Actionsheet>
  );
}
