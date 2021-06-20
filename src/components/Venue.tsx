import React, {useEffect, useState, useRef} from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

type Props = {
    name: string,
    address: string,
    icon?: string
}

export default function Venue(props: Props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    return (
        <div>
            <Card style={{padding: 0, margin: 0, cursor: "pointer"}} onClick={handleClickOpen}>
            <Divider style={{padding: 0, margin: 0}}/>

            <CardHeader
                
                title={props.icon && props.icon !== "" && <div><CardMedia
                        style={{height: 50, width: 50, backgroundColor: "grey"}}
                        image={props.icon.replace('\/', '/')}
                        title="icon"
                    />{props.name}</div>}
                subheader={props.address}
            />

            <CardContent>
            
            </CardContent>


            </Card>
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <List>
                    <ListItem><h6>Test</h6></ListItem>
                </List>
            </Dialog>
        </div>
    )
}