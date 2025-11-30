"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Chip,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import {
  searchCompanies,
  deleteCompany,
} from "@/services/CompanyService";
import DeleteConfirmDialog from "@/app/components/ui/DeleteConfirmDialog";

export default function List() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const t = useTranslations("company");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await searchCompanies("");
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = async () => {
    setLoading(true);
    setPage(0); // Reset to first page when searching
    try {
      const result = await searchCompanies(searchTerm);
      // CompanyService already filters deleted companies
      setData(result);
    } catch (error) {
      console.error("Error searching:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleMenuOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleMenuAction = (action) => {
    if (selectedRow) {
      if (action === "detail") {
        router.push(`/company/detail/${selectedRow.id}`);
        handleMenuClose();
      } else if (action === "edit") {
        router.push(`/company/edit/${selectedRow.id}`);
        handleMenuClose();
      } else if (action === "delete") {
        const rowToDelete = selectedRow;
        handleMenuClose();
        setSelectedRow(rowToDelete);
        setDeleteDialogOpen(true);
      }
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedRow) return;

    const companyId = selectedRow.id;
    setDeleting(true);

    try {
      await deleteCompany(companyId);
      setData((prevData) => prevData.filter((item) => item.id !== companyId));
      setPage(0);
      setDeleteDialogOpen(false);
      setSelectedRow(null);
    } catch (error) {
      console.error("Error deleting company:", error);
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedRow(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ width: "100%", mt: 1 }}>
      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          mb: 2,
          alignItems: "center",
          p: 1,
          borderRadius: 999,
          bgcolor: "background.paper",
          boxShadow: 1,
          maxWidth: 480,
        }}
      >
        <TextField
          size="small"
          placeholder={t("search")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearchKeyPress}
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            sx: {
              "& fieldset": { border: "none" },
              bgcolor: "background.default",
              borderRadius: 999,
            },
          }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          disabled={loading}
          startIcon={<SearchIcon />}
          sx={{
            borderRadius: 999,
            px: 2.5,
            textTransform: "none",
            fontWeight: 500,
            minWidth: 110,
          }}
        >
          {t("search")}
        </Button>
      </Box>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 8,
            gap: 2,
          }}
        >
          <CircularProgress size={40} thickness={4} />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.875rem" }}
          >
            {t("loading") || "Loading..."}
          </Typography>
        </Box>
      ) : (
        <div>
          <TableContainer component={Paper} elevation={1}>
            <Table size="small" aria-label="company table">
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark"
                        ? theme.palette.grey[800]
                        : theme.palette.grey[100],
                    "& .MuiTableCell-head": {
                      color: "text.primary",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                      py: 1.5,
                      borderBottom: "2px solid",
                      borderBottomColor: "divider",
                    },
                  }}
                >
                  <TableCell align="center" sx={{ width: 60 }}>
                    {t("no")}
                  </TableCell>
                  <TableCell>{t("taxId")}</TableCell>
                  <TableCell>{t("companyNameTh")}</TableCell>
                  <TableCell>{t("createDate")}</TableCell>
                  <TableCell>{t("updateDate")}</TableCell>
                  <TableCell>{t("isActive")}</TableCell>
                  <TableCell>{t("action")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        {t("noData")}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedData.map((row, index) => (
                    <TableRow
                      key={row.id}
                      hover
                      sx={{
                        "&:hover": { backgroundColor: "action.hover" },
                      }}
                    >
                      <TableCell
                        align="center"
                        sx={{ py: 1, fontSize: "0.75rem", width: 60 }}
                      >
                        {page * rowsPerPage + index + 1}
                      </TableCell>
                      <TableCell sx={{ py: 1, fontSize: "0.75rem" }}>
                        {row.taxId}
                      </TableCell>
                      <TableCell sx={{ py: 1, fontSize: "0.75rem" }}>
                        {row.companyNameTh}
                      </TableCell>
                      <TableCell sx={{ py: 1, fontSize: "0.75rem" }}>
                        {formatDate(row.createDate)}
                      </TableCell>
                      <TableCell sx={{ py: 1, fontSize: "0.75rem" }}>
                        {formatDate(row.updateDate)}
                      </TableCell>
                      <TableCell sx={{ py: 1 }}>
                        <Chip
                          label={row.isActive ? t("active") : t("inactive")}
                          color={row.isActive ? "success" : "default"}
                          size="small"
                          sx={{ height: 20, fontSize: "0.65rem" }}
                        />
                      </TableCell>
                      <TableCell sx={{ py: 1 }}>
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, row)}
                          sx={{ p: 0.5 }}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={() => handleMenuAction("detail")}>
              {t("detail")}
            </MenuItem>
            <MenuItem onClick={() => handleMenuAction("edit")}>
              {t("edit")}
            </MenuItem>
            <MenuItem onClick={() => handleMenuAction("delete")}>
              {t("delete")}
            </MenuItem>
          </Menu>
          <TablePagination
            component="div"
            count={data.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            sx={{
              "& .MuiTablePagination-toolbar": {
                minHeight: 40,
                fontSize: "0.75rem",
              },
              "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                {
                  fontSize: "0.75rem",
                },
            }}
          />
        </div>
      )}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        itemName={selectedRow?.companyNameTh}
        loading={deleting}
      />
    </Box>
  );
}
