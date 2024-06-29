import React, { useEffect, useState } from "react";
import Table from "@mui/joy/Table";
import { Button, Dialog, DialogContent, Pagination } from "@mui/material";
import { Delete } from "@mui/icons-material";
import "./UserHomePage.css";
import ViewUserComp from "../../components/ViewUserComp/ViewUserComp";
import DeleteUserComp from "../../components/DeleteUserComp/DeleteUserComp";

const ITEMS_PER_PAGE = 5;

export default function UserHomePage() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = data.slice(startIndex, endIndex);
  
  const onDeleteUser = (deletedUserId) => {
    setData((prevData) =>
      prevData.filter((user) => user._id !== deletedUserId)
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch("http://localhost:4040/api/v1/booknest/user/getUsers");
        if (response.ok) {
          let jsonData = await response.json();
          setData(jsonData.users);
        } else {
          console.error("Error fetching data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [data.length]); 

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

  return (
    <div className="user-table">
      <Table hoverRow>
        <thead>
          <tr>
            <th style={{ width: "10%" }}>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Role</th>
            <th style={{ width: "20%" }}>Actions</th>
          </tr>
        </thead>
        <tbody
          style={{
            // fontSize: "x-small",
            backgroundColor: "white",
            cursor: "pointer",
          }}
        >
          {currentData.map((row) => (
            <tr key={row._id}>
              <td>{row.userId}</td>
              <td>{row.name}</td>
              <td>{row.phone}</td>
              <td>{row.role}</td>
              <td>
                <div className="action-buttons">
                  <Button
                    variant="contained"
                    onClick={() => handleOpenDialog(row._id)}
                    // style={{ fontSize: 15, height: 20 }}   
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
          count={Math.ceil(data.length / ITEMS_PER_PAGE)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          // size="small"
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
  );
}
