import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import { AnimatePresence, motion } from "framer-motion";

import {
  BaseModal,
  BaseModalHeader,
  PrimaryText,
  Title,
} from "shared/lib/designSystem";
import MenuButton from "../../Header/MenuButton";
import theme from "shared/lib/designSystem/theme";
import colors from "shared/lib/designSystem/colors";

import { VaultOptions } from "shared/lib/constants/constants";
import StakingApprovalModalInfo from "./StakingApprovalModalInfo";
import TrafficLight from "../../Common/TrafficLight";
import { IERC20 } from "shared/lib/codegen";
import { useWeb3Context } from "shared/lib/hooks/web3Context";
import usePendingTransactions from "../../../hooks/usePendingTransactions";

const StyledModal = styled(BaseModal)`
  .modal-dialog {
    max-width: 343px;
    margin-left: auto;
    margin-right: auto;
  }

  .modal-content {
    min-height: 424px;
    overflow: hidden;
  }
`;

const ModalContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  padding: 16px;
`;

const FloatingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -16px;
  left: 0;
  width: 100%;
  height: calc(100%);
  padding: 0 16px;
`;

const ModalHeaderBackground = styled.div`
  background: ${colors.pillBackground};
  height: 72px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  margin-top: -32px;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: ${theme.border.width} ${theme.border.style} ${colors.border};
  border-radius: 48px;
  color: ${colors.text};
  z-index: 2;
`;

const ContentColumn = styled.div<{ marginTop?: number | "auto" }>`
  display: flex;
  justify-content: center;
  z-index: 1;
  margin-top: ${(props) =>
    props.marginTop === "auto"
      ? props.marginTop
      : `${props.marginTop || 24}px`};
`;

interface StakingApprovalModalProps {
  show: boolean;
  onClose: () => void;
  vaultOption: VaultOptions;
  tokenContract: IERC20 | undefined;
}

const StakingApprovalModal: React.FC<StakingApprovalModalProps> = ({
  show,
  onClose,
  vaultOption,
  tokenContract,
}) => {
  const [step, setStep] = useState<"info" | "approve" | "approving">("info");
  const { provider } = useWeb3Context();
  const [, setPendingTransactions] = usePendingTransactions();

  const handleClose = useCallback(() => {
    onClose();
    if (step === "approve") {
      setStep("info");
    }
  }, [step, onClose]);

  const handleApprove = useCallback(async () => {
    if (!tokenContract) {
      return;
    }

    setStep("approve");
    const amount =
      "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

    try {
      const tx = await tokenContract.approve(
        // TODO: Replace with real spender address
        "0x76e7Caa7131581eE6f4c562b7Ca5379AB9024083",
        amount
      );

      setStep("approving");

      const txhash = tx.hash;

      setPendingTransactions((pendingTransactions) => [
        ...pendingTransactions,
        {
          txhash,
          type: "approval",
          amount: amount,
          vault: vaultOption,
        },
      ]);

      // Wait for transaction to be approved
      await provider.waitForTransaction(txhash);
      setStep("info");
      onClose();
    } catch (err) {
      setStep("info");
    }
  }, [tokenContract, provider, setPendingTransactions, vaultOption, onClose]);

  const body = useMemo(() => {
    switch (step) {
      case "info":
        return (
          <StakingApprovalModalInfo
            vaultOption={vaultOption}
            onApprove={handleApprove}
          />
        );
      case "approve":
      case "approving":
        return (
          <>
            <ContentColumn marginTop={-24}>
              <Title>
                {step === "approve"
                  ? "CONFIRM Approval"
                  : "TRANSACTION SUBMITTED"}
              </Title>
            </ContentColumn>
            <ModalHeaderBackground />
            <FloatingContainer>
              <TrafficLight active={step === "approving"} />
            </FloatingContainer>
            {step === "approve" ? (
              <ContentColumn marginTop="auto">
                <PrimaryText className="mb-2">
                  Confirm this transaction in your wallet
                </PrimaryText>
              </ContentColumn>
            ) : (
              <></>
            )}
          </>
        );
    }
  }, [step, vaultOption, handleApprove]);

  return (
    <StyledModal show={show} onHide={handleClose} centered backdrop={true}>
      <BaseModalHeader>
        <CloseButton role="button" onClick={handleClose}>
          <MenuButton
            isOpen={true}
            onToggle={handleClose}
            size={20}
            color={"#FFFFFFA3"}
          />
        </CloseButton>
      </BaseModalHeader>
      <Modal.Body>
        <AnimatePresence initial={false}>
          <ModalContent
            key={step}
            transition={{
              duration: 0.25,
              type: "keyframes",
              ease: "easeInOut",
            }}
            initial={
              step === "info" || step === "approve"
                ? {
                    y: -200,
                    opacity: 0,
                  }
                : {}
            }
            animate={
              step === "info" || step === "approve"
                ? {
                    y: 0,
                    opacity: 1,
                  }
                : {}
            }
            exit={
              step === "info"
                ? {
                    y: 200,
                    opacity: 0,
                  }
                : {}
            }
          >
            {body}
          </ModalContent>
        </AnimatePresence>
      </Modal.Body>
    </StyledModal>
  );
};

export default StakingApprovalModal;