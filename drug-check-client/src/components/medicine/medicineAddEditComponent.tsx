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

const medicineService: MedicineService = new MedicineService();
const activeIngredientService: ActiveIngredientService = new ActiveIngredientService();

const MedicineAddEditComponent = (props: any) => {
    const [activeIngredients, setActiveIngredients] = useState<Array<ActiveIngredientModel>>();
    const [activeIngredient, setActiveIngredient] = useState<number>(0);
    const [medicine, setMedicine] = useState<MedicineModel>(props.medicine);

    useEffect(() => {
        activeIngredientService.getActiveIngredients().then(res => {
            setActiveIngredients(res);
        });
    }, [])

    useEffect(() => {
        if (props.medicine && props.medicine.activeIngredient)
            setActiveIngredient(props.medicine.activeIngredient.id);
    }, [props.medicine])

    const saveMedicine = () => {

    }

    const changeActiveIngredient = (value) => {
        setActiveIngredient(value);
    }

    const onChange = (prop, value) => {
        let med = { ...medicine };
        med[prop] = value;
        setMedicine(med);
    }

    return (
        <Dialog open={props.isVisible} onClose={() => props.setIsVisible(false)}>
            <Modal.DialogTitle onClose={() => props.setIsVisible(false)}>{props.isEdit ? 'Edit medicine' : 'Add medicine'}</Modal.DialogTitle>
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
                        style={{ marginBottom: 20 }} />
                    <TextField
                        value={medicine && medicine.shortDescription ? medicine.shortDescription : ''}
                        onChange={e => onChange('shortDescription', e.target.value)}
                        label="Short description"
                        style={{ marginBottom: 20 }}
                        multiline />
                </div>
            </Modal.DialogContent>
            <Modal.DialogActions>
                <div className="dialog-actions">
                    <Button variant="contained" color="primary" onClick={saveMedicine} style={{ marginRight: '10px' }}>Save</Button>
                    <Button variant="contained" color="default" onClick={() => props.setIsVisible(false)}>Close</Button>
                </div>
            </Modal.DialogActions>
        </Dialog>
    );
}

export default MedicineAddEditComponent;