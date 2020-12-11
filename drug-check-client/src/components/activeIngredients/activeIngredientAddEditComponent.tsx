import React, { useState } from 'react';
import * as Modal from '../../common/modalDialog';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import { ActiveIngredientModel } from '../../models/activeIngredientModel';
import ActiveIngredientService from '../../services/activeIngredientService';
import Growl from '../../common/growl/growl';
import Checkbox from '@material-ui/core/Checkbox'

const activeIngredientService: ActiveIngredientService = new ActiveIngredientService();
let growl: any;

const ActiveIngredientAddEditComponent = (props: any) => {
    const [activeIngredient, setActiveIngredient] = useState<ActiveIngredientModel>(props.activeIngredient);

    const saveActiveIngredients = () => {
        if (!activeIngredient || !activeIngredient.name) {
            growl.show({ severity: 'warning', summary: 'Flease fill all fields' });
            return;
        }

        if (activeIngredient.id && activeIngredient.id > 0) {
            activeIngredientService.updateActiveIngredients(activeIngredient).then(res => {
                props.setIsVisible(false, true);
            }).catch(err => {
                if (growl)
                    growl.show({ severity: 'error', summary: 'Error updating active ingredient' });
            });
        }
        else {
            activeIngredientService.addActiveIngredients(activeIngredient).then(res => {
                props.setIsVisible(false, true);
            }).catch(err => {
                if (growl)
                    growl.show({ severity: 'error', summary: 'Error creating active ingredient' });
            });
        }
    }

    const onChange = (prop, value) => {
        let activeI = { ...activeIngredient };
        activeI[prop] = value;
        setActiveIngredient(activeI);
    }

    const handleInteractionClick = (interaction: number) => {
        let aIngredient: ActiveIngredientModel = JSON.parse(JSON.stringify(activeIngredient));
        if (!aIngredient.interactions)
            aIngredient.interactions = new Array<number>();

        let foundIndex = aIngredient.interactions.findIndex(r => r === interaction);
        if (foundIndex > -1)
            aIngredient.interactions.splice(foundIndex, 1);
        else
            aIngredient.interactions.push(interaction);

        setActiveIngredient(aIngredient);
    }

    return (
        <Dialog open={props.isVisible} onClose={() => props.setIsVisible(false, false)}>
            <Growl ref={(r) => growl = r} />
            <Modal.DialogTitle onClose={() => props.setIsVisible(false, false)}>{props.activeIngredient &&
                props.activeIngredient.id ? 'Edit active ingredient' : 'Add active ingredient'}</Modal.DialogTitle>
            <Modal.DialogContent>
                <div className="dialog-content">
                    <TextField
                        value={activeIngredient && activeIngredient.name ? activeIngredient.name : ''}
                        onChange={e => onChange('name', e.target.value)}
                        label="Name"
                        style={{ marginBottom: 20 }}
                        error={activeIngredient && activeIngredient.name && activeIngredient.name === '' ? true : false} />
                    <div className="interactions-dialog">
                        <span style={{ fontSize: 13, color: 'gray' }}>Interactions</span>
                        {props.otherActiveIngredients.map(r => {
                            return <div key={'interaction' + r.id} className="interaction-item">
                                <Checkbox
                                    checked={(activeIngredient && activeIngredient.interactions &&
                                        activeIngredient.interactions.some(i => i === r.id)) || false}
                                    onChange={() => handleInteractionClick(r.id)}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                                <div>{r.name}</div>
                            </div>
                        })}
                    </div>
                </div>
            </Modal.DialogContent>
            <Modal.DialogActions>
                <div className="dialog-actions">
                    <Button variant="contained" color="primary" onClick={saveActiveIngredients} style={{ marginRight: '10px' }}>Save</Button>
                    <Button variant="contained" color="default" onClick={() => props.setIsVisible(false, false)}>Close</Button>
                </div>
            </Modal.DialogActions>
        </Dialog>
    );
}

export default ActiveIngredientAddEditComponent;