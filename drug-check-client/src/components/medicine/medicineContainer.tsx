import React, { useState, useEffect } from 'react';
import MedicineService from '../../services/medicineService';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { MedicineModel } from '../../models/medicineModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@material-ui/core';
import MedicineAddEditComponent from './medicineAddEditComponent';

const medicineService: MedicineService = new MedicineService();


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const MedicineContainer = (props: any) => {
    const [medicines, setMedicines] = useState<Array<MedicineModel>>(new Array<MedicineModel>());
    const [isVisibleDialog, setIsVisible] = useState<boolean>(false);
    const [selectedMedicine, setSelectedMedicine] = useState<MedicineModel>(new MedicineModel());

    useEffect(() => {
        medicineService.getMedicines().then(res => {
            setMedicines(res);
        });
    }, []);

    const addMedicine = () => {
        setSelectedMedicine(new MedicineModel());
        setIsVisible(true);
    }

    const onEditClick = (medicine: MedicineModel) => {
        setSelectedMedicine(medicine);
        setIsVisible(true);
    }

    const classes = useStyles();

    return (
        <div className="medicine-container">
            <h1 className="page-title">Medicines</h1>
            <Button onClick={addMedicine} variant="contained" color="primary" style={{ marginBottom: 20 }}>
                Add
            </Button>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Short description</TableCell>
                            <TableCell align="left">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {medicines.map((med, indx) => {
                            return <TableRow key={med.id}>
                                <TableCell align="left">{indx + 1}</TableCell>
                                <TableCell align="left">{med.name}</TableCell>
                                <TableCell align="left">{med.shortDescription}</TableCell>
                                <TableCell align="left" style={{ width: 150 }}>
                                    <div className="datatable-icons">
                                        <div className="icon" onClick={() => onEditClick(med)}>
                                            <FontAwesomeIcon icon={faEdit} style={{ color: "#4452b8" }} />
                                        </div>
                                        <div className="icon">
                                            <FontAwesomeIcon icon={faTrash} style={{ color: "#db6262" }} />
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            {isVisibleDialog ? <MedicineAddEditComponent
                isVisible={isVisibleDialog}
                setIsVisible={setIsVisible}
                medicine={selectedMedicine} /> : null}
        </div>
    );
}

export default MedicineContainer;