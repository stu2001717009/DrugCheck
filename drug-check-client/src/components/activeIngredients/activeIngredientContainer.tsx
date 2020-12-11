import React, { useState, useEffect } from 'react';
import ActiveIngredientsService from '../../services/activeIngredientService';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ActiveIngredientModel } from '../../models/activeIngredientModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@material-ui/core';
import ActiveIngredientsAddEditComponent from './activeIngredientAddEditComponent';
import Growl from '../../common/growl/growl';

const activeIngredientService: ActiveIngredientsService = new ActiveIngredientsService();


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

let growl: any;

const ActiveIngredientContainer = (props: any) => {
    const [activeIngredients, setActiveIngredients] = useState<Array<ActiveIngredientModel>>(new Array<ActiveIngredientModel>());
    const [isVisibleDialog, setIsVisible] = useState<boolean>(false);
    const [selectedActiveIngredient, setSelectedActiveIngredient] = useState<ActiveIngredientModel>(new ActiveIngredientModel());

    const getActiveIngredientss = () => {
        activeIngredientService.getActiveIngredientsWithInteractions().then(res => {
            setActiveIngredients(res);
        }).catch(err => {
            if (growl) {
                growl.show({ severity: 'error', summary: 'Error getting activeIngredients' });
            }
        });
    }

    useEffect(getActiveIngredientss, []);

    const addActiveIngredients = () => {
        setSelectedActiveIngredient(new ActiveIngredientModel());
        setIsVisible(true);
    }

    const onEditClick = (activeIngredient: ActiveIngredientModel) => {
        setSelectedActiveIngredient(activeIngredient);
        setIsVisible(true);
    }

    const toggleDialog = (visibility, getMeds) => {
        setIsVisible(visibility);
        if (getMeds)
            getActiveIngredientss();
    }

    const deleteClick = (activeIngredient: ActiveIngredientModel) => {
        activeIngredientService.deleteActiveIngredients(activeIngredient.id).then(res => {
            if (growl)
                growl.show({ severity: 'success', summary: 'Successfully delete active ingredient' });
            getActiveIngredientss();
        }).catch(err => {
            if (growl)
                growl.show({ severity: 'error', summary: 'Error delete active ingredient' });
        });
    }

    const classes = useStyles();

    return (
        <div className="container">
            <Growl ref={(r) => growl = r} />
            <h1 className="page-title">Active Ingredients</h1>
            <Button onClick={addActiveIngredients} variant="contained" color="primary" style={{ marginBottom: 20 }}>
                Add
            </Button>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {activeIngredients.map((activeI, indx) => {
                            return <TableRow key={activeI.id}>
                                <TableCell align="left">{indx + 1}</TableCell>
                                <TableCell align="left">{activeI.name}</TableCell>
                                <TableCell align="left" style={{ width: 150 }}>
                                    <div className="datatable-icons">
                                        <div className="icon" onClick={() => onEditClick(activeI)}>
                                            <FontAwesomeIcon icon={faEdit} style={{ color: "#4452b8" }} />
                                        </div>
                                        <div className="icon" onClick={() => deleteClick(activeI)}>
                                            <FontAwesomeIcon icon={faTrash} style={{ color: "#db6262" }} />
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            {isVisibleDialog ? <ActiveIngredientsAddEditComponent
                isVisible={isVisibleDialog}
                setIsVisible={toggleDialog}
                activeIngredient={selectedActiveIngredient}
                otherActiveIngredients={selectedActiveIngredient && selectedActiveIngredient.id ?
                    JSON.parse(JSON.stringify(activeIngredients)).filter(r => r.id !== selectedActiveIngredient.id) :
                    JSON.parse(JSON.stringify(activeIngredients))
                } /> : null}
        </div>
    );
}

export default ActiveIngredientContainer;