import React, { useState, useEffect } from 'react';
import MedicineService from '../../services/medicineService';
import * as Modal from '../../common/modalDialog';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { ActiveIngredientModel } from '../../models/activeIngredientModel';
import ActiveIngredientService from '../../services/activeIngredientService';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { MedicineModel } from '../../models/medicineModel';
import Growl from '../../common/growl/growl';

const medicineService: MedicineService = new MedicineService();
const activeIngredientService: ActiveIngredientService = new ActiveIngredientService();
let growl: any;

const MedicineAddEditComponent = (props: any) => {
    const [activeIngredients, setActiveIngredients] = useState<Array<ActiveIngredientModel>>();
    const [activeIngredient, setActiveIngredient] = useState<number>(0);
    const [medicine, setMedicine] = useState<MedicineModel>(props.medicine);

    const getActiveIngredients = () => {
        activeIngredientService.getActiveIngredients().then(res => {
            setActiveIngredients(res);
            if (props.medicine && props.medicine.activeIngredient)
                setActiveIngredient(props.medicine.activeIngredient.id);
        }).catch(err => {
            if (growl)
                growl.show({ severity: 'error', summary: 'Error getting active ingredients' });
        });
    }

    useEffect(getActiveIngredients, [props.medicine]);

    const checkMed = () => {
        if (props.medicine && props.medicine.activeIngredient && activeIngredients && activeIngredients.length > 0)
            setActiveIngredient(props.medicine.activeIngredient.id);
    };

    useEffect(checkMed, [props.medicine, activeIngredients])

    const saveMedicine = () => {
        if (!activeIngredient || !medicine.name || !medicine.tabletsPackage ||
            medicine.name.trim() === '' || medicine.tabletsPackage.trim() === '') {
            growl.show({ severity: 'warning', summary: 'Flease fill all fields' });
            return;
        }

        medicine.activeIngredient = new ActiveIngredientModel();
        medicine.activeIngredient.id = activeIngredient;
        if (medicine.id && medicine.id > 0) {
            medicineService.updateMedicine(medicine).then(res => {
                props.setIsVisible(false, true);
            }).catch(err => {
                if (growl)
                    growl.show({ severity: 'error', summary: 'Error updating medicine' });
            });
        }
        else {
            medicineService.addMedicine(medicine).then(res => {
                props.setIsVisible(false, true);
            }).catch(err => {
                if (growl)
                    growl.show({ severity: 'error', summary: 'Error creating medicine' });
            });
        }
    }

    const changeActiveIngredient = (value) => setActiveIngredient(value);

    const onChange = (prop, value) => {
        let med = { ...medicine };
        med[prop] = value;
        setMedicine(med);
    }

    return (
        <Dialog open={props.isVisible} onClose={() => props.setIsVisible(false, false)}>
            <Growl ref={(r) => growl = r} />
            <Modal.DialogTitle onClose={() => props.setIsVisible(false, false)}>{props.medicine && props.medicine.id
                ? 'Edit medicine' : 'Add medicine'}</Modal.DialogTitle>
            <Modal.DialogContent>
                <div className="dialog-content">
                    <FormControl>
                        <InputLabel id="marker-type-label">Active ingredient</InputLabel>
                        <Select value={activeIngredient > 0 ? activeIngredient : ''}
                            onChange={(e) => changeActiveIngredient(e.target.value)}
                            labelId="marker-type-label"
                            id="marker-type"
                            style={{ marginBottom: 20, width: '100%' }}>
                            {activeIngredients ?
                                activeIngredients.map(r => <MenuItem key={'aI' + r.id} value={r.id}>
                                    {r.name}
                                </MenuItem>) : null}
                        </Select>
                    </FormControl>
                    <TextField
                        value={medicine && medicine.name ? medicine.name : ''}
                        onChange={e => onChange('name', e.target.value)}
                        label="Name"
                        style={{ marginBottom: 20 }}
                        error={medicine && medicine.name && medicine.name === '' ? true : false} />
                    <TextField
                        value={medicine && medicine.tabletsPackage ? medicine.tabletsPackage : ''}
                        onChange={e => onChange('tabletsPackage', e.target.value)}
                        label="Package"
                        style={{ marginBottom: 20 }}
                        error={medicine && medicine.tabletsPackage && medicine.tabletsPackage === '' ? true : false} />
                </div>
            </Modal.DialogContent>
            <Modal.DialogActions>
                <div className="dialog-actions">
                    <Button variant="contained" color="primary" onClick={saveMedicine} style={{ marginRight: '10px' }}>Save</Button>
                    <Button variant="contained" color="default" onClick={() => props.setIsVisible(false, false)}>Close</Button>
                </div>
            </Modal.DialogActions>
        </Dialog>
    );
}

export default MedicineAddEditComponent;