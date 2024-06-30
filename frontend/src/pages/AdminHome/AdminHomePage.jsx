import React, { useState } from "react";
import Table from "@mui/joy/Table";
import { Button, Dialog, DialogContent, Pagination } from "@mui/material";
import { Delete } from "@mui/icons-material";
import "./AdminHomePage.css";
import ViewUserComp from "../../components/ViewUserComp/ViewUserComp";
import DeleteUserComp from "../../components/DeleteUserComp/DeleteUserComp";
import SearchComp from "../../components/SearchComp/SearchComp";
import { useQuery } from "react-query";
import LoadingComp from "../../components/LoadingComp/LoadingComp";

const ITEMS_PER_PAGE = 5;

export default function AdminHomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Fetch data using React Query
  const { data: users = [], isLoading, isError, refetch } = useQuery(
    "users",
    async () => {
      const response = await fetch(
        "https://booknest-server-blue.vercel.app/api/v1/booknest/user/getUsers"
      );
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const jsonData = await response.json();
      return jsonData.users;
    }
  );
  if(isLoading)
    <LoadingComp/>

  const handleOpenDialog = (userId) => {
    setSelectedUserId(userId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (query) => {
    // Handle search functionality
  };

  const onDeleteUser = (deletedUserId) => {
    // Optimistically update the UI
    setData((prevData) =>
      prevData.filter((user) => user._id !== deletedUserId)
    );

    // Perform delete operation on the server or handle as needed
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = users.slice(startIndex, endIndex);

  return (
    <div className="admin-home">
      <SearchComp onSearch={handleSearch} suggestions={users.map((user) => user.name)} />
      <div className="user-table">
        <Table hoverRow>
          <thead>
            <tr>
              <th style={{ width: "10%" }}>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th style={{ width: "20%" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, index) => (
              <tr key={row._id}>
                <td>{index + 1}</td>
                <td>{row.name}</td>
                <td>{row.phone}</td>
                <td>{row.email}</td>
                <td>
                  <div className="action-buttons">
                    <Button
                      variant="contained"
                      onClick={() => handleOpenDialog(row._id)}
                    >
                      View User
                    </Button>
                    <Button
                      variant="text"
                      color="error"
                      style={{ marginLeft: 6 }}
                      onClick={() => setIsDeleteDialogOpen(true)}
                    >
                      <Delete />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogContent>
            {selectedUserId && <ViewUserComp userId={selectedUserId} />}
          </DialogContent>
        </Dialog>
        <div className="pagination">
          <Pagination
            count={Math.ceil(users.length / ITEMS_PER_PAGE)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
        {isDeleteDialogOpen && (
          <DeleteUserComp
            userId={selectedUserId}
            open={isDeleteDialogOpen}
            handleClose={() => {
              setIsDeleteDialogOpen(false);
            }}
            onDeleteUser={onDeleteUser}
          />
        )}
      </div>
    </div>
  );
}
