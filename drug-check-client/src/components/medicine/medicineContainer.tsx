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

const medicineService: MedicineService = new MedicineService();


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const MedicineContainer = (props: any) => {
    const [medicines, setMedicines] = useState<Array<MedicineModel>>(new Array<MedicineModel>());

    useEffect(() => {
        medicineService.getMedicines().then(res => {
            debugger
            setMedicines(res);
        });
    }, []);

    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Short description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {medicines.map((med, indx) => {
                        return <TableRow key={med.id}>
                            <TableCell align="left">{indx}</TableCell>
                            <TableCell align="left">{med.name}</TableCell>
                            <TableCell align="left">{med.shortDescription}</TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default MedicineContainer;