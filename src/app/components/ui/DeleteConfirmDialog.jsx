"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Box,
} from "@mui/material";
import { WarningAmberRounded } from "@mui/icons-material";
import Button from "./Button";
import { useTranslations } from "next-intl";

export default function DeleteConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  itemName,
  loading = false,
  confirmText,
  cancelText,
}) {
  const t = useTranslations("company");

  const titleText = title || t("confirmDelete") || "Confirm delete";
  const mainMessage =
    message ||
    t("deleteConfirmMessage") ||
    "Are you sure you want to delete this item?";
  const warningText =
    t("deleteWarning") || "This action cannot be undone.";
  const cancelLabel = cancelText || t("cancel") || "Cancel";
  const confirmLabel =
    confirmText || t("delete") || "Delete";
  const deletingLabel = t("deleting") || "Deleting...";

  const handleClose = () => {
    if (!loading && onClose) onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : handleClose}
      maxWidth="xs"
      fullWidth
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
      PaperProps={{
        sx: {
          borderRadius: 2.5,
          boxShadow: 6,
        },
      }}
    >
      {/* Title */}
      <DialogTitle
        id="delete-dialog-title"
        sx={{
          fontSize: "0.95rem",
          pb: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WarningAmberRounded
            fontSize="small"
            color="warning"
          />
          <span>{titleText}</span>
        </Box>
      </DialogTitle>

      {/* Content */}
      <DialogContent
        sx={{
          pt: 0.5,
          pb: 1,
        }}
      >
        <DialogContentText
          id="delete-dialog-description"
          sx={{ fontSize: "0.875rem", mb: itemName ? 1 : 0.5 }}
        >
          {mainMessage}
          {itemName && (
            <>
              {" "}
              <strong>"{itemName}"</strong>?
            </>
          )}
        </DialogContentText>

        <DialogContentText
          sx={{
            fontSize: "0.78rem",
            color: "text.secondary",
            mt: 0.5,
          }}
        >
          {warningText}
        </DialogContentText>
      </DialogContent>

      {/* Actions */}
      <DialogActions
        sx={{
          px: 2,
          pb: 2,
          pt: 1,
          gap: 1,
          justifyContent: "flex-end",
        }}
      >
        <Button
          onClick={handleClose}
          disabled={loading}
          variant="outlined"
          size="small"
        >
          {cancelLabel}
        </Button>

        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={loading}
          size="small"
          startIcon={
            loading ? (
              <CircularProgress size={14} color="inherit" />
            ) : undefined
          }
        >
          {loading ? deletingLabel : confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
