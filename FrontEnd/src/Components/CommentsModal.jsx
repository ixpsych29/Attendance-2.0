import React from "react";
import { Modal, Box, Typography, TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Visibility } from "@mui/icons-material";

const CommentsModal = ({ isOpen, handleClose, request }) => {
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "white",
          p: 4,
          borderRadius: 4,
        }}>
        <IconButton
          sx={{
            position: "absolute",
            top: 3,
            right: 18,
          }}
          onClick={handleClose}>
          <CloseIcon />
        </IconButton>

        {request && (
          <>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ textAlign: "center", marginBottom: 4 }}>
              Admin Comments
            </Typography>

            {/* Conditional rendering based on approval or disapproval */}
            {request.approvalComments && !request.disapprovalReason && (
              <TextField
                fullWidth
                label="Approval Comments"
                variant="outlined"
                multiline
                rows={4}
                value={request.approvalComments}
                disabled
              />
            )}

            {request.disapprovalReason && !request.approvalComments && (
              <TextField
                fullWidth
                label="Disapproval Reason"
                variant="outlined"
                multiline
                rows={4}
                value={request.disapprovalReason}
                disabled
                sx={{ marginTop: 2 }}
              />
            )}

            {/* Default empty comment */}
            {request.approvalComments === undefined &&
              request.disapprovalReason === undefined && (
                <Typography variant="body1" color="textSecondary">
                  No comments available.
                </Typography>
              )}
          </>
        )}
      </Box>
    </Modal>
  );
};

export default CommentsModal;
