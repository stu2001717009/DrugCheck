import React, { useState, useEffect } from 'react';
import * as Modal from '../../common/modalDialog';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Growl from '../../common/growl/growl';
import MedicineService from '../../services/medicineService';
import { MedicineModel } from '../../models/medicineModel';
import Radio from '@material-ui/core/Radio';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
            height: 28,
            fontSize: "1em"
        },
        iconButton: {
            padding: 5,
        },
        divider: {
            height: 28,
            margin: 4,
        },
    }),
);

const medicineService: MedicineService = new MedicineService();
let growl: any;

const SearchMedicineDialog = (props: any) => {
    const [medicines, setMedicines] = useState<Array<MedicineModel>>(new Array<MedicineModel>());
    const [selectedMedicine, setSelectedMedicine] = useState<MedicineModel>(new MedicineModel());
    const [searchedName, setSearchedName] = useState<string>('');
    const classes = useStyles();

    const getMedicines = (searchParam) => {
        medicineService.getMedicinesByName(searchParam).then(res => {
            setMedicines(res);
        }).catch(err => {
            if (growl)
                growl.show({ severity: 'error', summary: 'Error getting medicines' });
        });
    }

    useEffect(() => getMedicines(''), []);

    const addMedicine = () => {
        if (!selectedMedicine || selectedMedicine.id === 0) {
            growl.show({ severity: 'warning', summary: 'Please choose medicine' });
            return;
        }

        props.addMedicine(selectedMedicine);
    }

    const handleChange = (medicine: MedicineModel) => {
        setSelectedMedicine(medicine);
    }

    const onClearClick = () => {
        setSearchedName('');
    }

    return (
        <Dialog open={props.isVisible} onClose={() => props.setIsVisible(false)}>
            <Growl ref={(r) => growl = r} />
            <Modal.DialogTitle onClose={() => props.setIsVisible(false)}>Choose medicine</Modal.DialogTitle>
            <Modal.DialogContent>
                <div className="dialog-content">
                    <div>
                        <Input
                            className={classes.input}
                            placeholder="Search"
                            inputProps={{ 'aria-label': 'search ship' }}
                            value={searchedName}
                            onChange={(e) => setSearchedName(e.target.value)}
                            onKeyDown={(e) => { if (e.keyCode === 13) getMedicines(searchedName) }}
                        />
                        <IconButton className={classes.iconButton} aria-label="clear" onClick={onClearClick}>
                            <ClearIcon />
                        </IconButton>
                        <IconButton className={classes.iconButton} aria-label="search" onClick={() => getMedicines(searchedName)}>
                            <SearchIcon />
                        </IconButton>
                    </div>
                    <div className="list">
                        {medicines ? medicines.map(medicine => (
                            <div className="list-item" key={'med' + medicine.id}>
                                <div>
                                    <Radio
                                        checked={selectedMedicine.id === medicine.id || false}
                                        onChange={() => handleChange(medicine)}
                                        value="a"
                                        name="radio-button"
                                    />
                                </div>
                                <div>{medicine.name}</div>
                            </div>
                        )) : null}
                    </div>
                </div>
            </Modal.DialogContent>
            <Modal.DialogActions>
                <div className="dialog-actions">
                    <Button variant="contained" color="primary" onClick={addMedicine} style={{ marginRight: '10px' }}
                        disabled={!selectedMedicine || !selectedMedicine.id}>Add</Button>
                    <Button variant="contained" color="default" onClick={() => props.setIsVisible(false)}>Close</Button>
                </div>
            </Modal.DialogActions>
        </Dialog>
    );
}

export default SearchMedicineDialog;