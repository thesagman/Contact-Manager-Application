const express = require('express')
const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel')

const getContacts = asyncHandler(async (req, res) => {
    const contact = await Contact.find({ user_id: req.user.id })
    res.status(200).json(contact)
})

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error(`Contact not found`)
    }

    res.status(200).json(contact)
})

const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400)
        throw new Error(`All Fields are mandatory`)
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })
    res.status(200).json(contact)
})

const UpdateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error(`Contact not found`)
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error(`Permission Denied`)
    }
    const UpdatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(UpdatedContact)
})

const DeleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error(`Contact not found`)
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error(`Permission Denied`)
    }
    const DeletedContact = await Contact.findByIdAndDelete(
        req.params.id
    )
    res.status(200).json(DeletedContact)
})

module.exports = { getContacts, getContact, createContact, UpdateContact, DeleteContact }