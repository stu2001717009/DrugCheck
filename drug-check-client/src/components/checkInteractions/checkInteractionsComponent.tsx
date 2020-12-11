import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Growl from '../../common/growl/growl';
import { MedicineModel } from '../../models/medicineModel';
import SearchMedicineDialog from './searchMedicineDialog';
import { Button } from '@material-ui/core';
import MedicineService from '../../services/medicineService';

const medicineService = new MedicineService();
let growl: any;

const CheckInteractions = (props: any) => {
    const [firstMedicine, setFirstMedicine] = useState<MedicineModel>(new MedicineModel());
    const [secondMedicine, setSecondMedicine] = useState<MedicineModel>(new MedicineModel());
    const [isVisibleDialog, setIsVisible] = useState<boolean>(false);
    const [isFirst, setIsFirst] = useState<boolean>(true);
    const [interaction, setInteraction] = useState<boolean>(false);

    const addMedicine = (med) => {
        if (isFirst) {
            if (med.id === secondMedicine.id)
                return;

            setFirstMedicine(med);
        }
        else {
            if (med.id === firstMedicine.id)
                return;

            setSecondMedicine(med);
        }

        setIsVisible(false);
    }

    const openDialog = (isFirst) => {
        setIsFirst(isFirst);
        setIsVisible(true);
    }

    const clearMedicines = () => {
        setFirstMedicine(new MedicineModel());
        setSecondMedicine(new MedicineModel());
        setInteraction(false);
    }

    const checkMedicineInteractions = () => {
        medicineService.checkInteractions(firstMedicine.id, secondMedicine.id).then(res => {
            setInteraction(res);
        }).catch(err => {
            if (growl)
                growl.show({ severity: 'error', summary: 'Error getting interaction' });
        });
    }

    return (
        <div className="container">
            <Growl ref={(r) => growl = r} />
            <h1 className="page-title">Check interactions between medicines</h1>
            <Paper className="paper">
                <div className="check-container">
                    <div className="check-item">
                        <div className="title-button">
                            <h3>First medicine</h3>
                            <Button variant="contained" color="secondary" onClick={() => openDialog(true)}>
                                Add
                        </Button>
                        </div>
                        <div>{firstMedicine && firstMedicine.name ? firstMedicine.name : null}</div>
                    </div>
                    <div className="check-item">
                        <div className="title-button">
                            <h3>Second medicine</h3>
                            <Button variant="contained" color="secondary" onClick={() => openDialog(false)}>
                                Add
                            </Button>
                        </div>
                        <div>{secondMedicine && secondMedicine.name ? secondMedicine.name : null}</div>
                    </div>
                </div>
                <div className="interaction-check-buttons">
                    <Button variant="contained" color="primary" onClick={checkMedicineInteractions} style={{ marginRight: 10 }}>
                        Check
                    </Button>
                    <Button variant="contained" color="default" onClick={clearMedicines}>
                        Clear
                    </Button>
                </div>
            </Paper>
            {interaction ?
                <Paper className="paper" style={{ marginTop: 20 }}>
                    <div className="interaction-text">There is an interaction between the selected medicines.<br />
                    It is not recommended to use them simultaneously!</div>
                </Paper>
                : null}
            {isVisibleDialog ? <SearchMedicineDialog
                isVisible={isVisibleDialog}
                setIsVisible={setIsVisible}
                addMedicine={addMedicine}
            /> : null}
        </div>
    );
}

export default CheckInteractions;