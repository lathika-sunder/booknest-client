import React, { useEffect, useState } from "react";
import Table from "@mui/joy/Table";
import { Button, Dialog, DialogContent, Pagination } from "@mui/material";
import { Delete } from "@mui/icons-material";

import ViewUserComp from "../../components/ViewUserComp/ViewUserComp";
import DeleteUserComp from "../../components/DeleteUserComp/DeleteUserComp";

const ITEMS_PER_PAGE = 5;

export default function AdminDuesPage() {
  const [data, setData] = useState([]);
  let index=0;
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
        let response = await fetch("https://booknest-server-blue.vercel.app/api/v1/booknest/book/getDueBooks");
        if (response.ok) {
          let jsonData = await response.json();
          setData(jsonData.dueBooks);
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
    console.log(userId)
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
            <th>User Name</th>
            <th>Book Name</th>
            <th>Lended Date</th>
          
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
              <td>{index+=1}</td>
              <td>{row.user}</td>
              <td>{row.book}</td>
              <td>{row.lendedDate}</td>
           
              <td>
                <div className="action-buttons">
                  <Button
                    variant="contained"
                    onClick={() => handleOpenDialog(row._id)}
                    // style={{ fontSize: 15, height: 20 }}   
                      >
                    View Book
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
