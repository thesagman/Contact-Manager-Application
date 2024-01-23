const express = require('express');
const router = express.Router();
const { getContacts,getContact ,createContact, UpdateContact, DeleteContact } = require('../controllers/contact')
const ValidateToken = require('../middleware/ValidateTokenHandler')

// router.route('/').get(getContacts);
// router.route('/:id').get(getContact)
// router.route('/').post(createContact);
// router.route('/:id').put(UpdateContact);
// router.route('/:id').delete(DeleteContact);
router.use(ValidateToken)
router.route('/').get(getContacts).post(createContact);
router.route('/:id').get(getContact).put(UpdateContact).delete(DeleteContact);;


module.exports = router;
