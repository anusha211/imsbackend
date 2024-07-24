"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInternship = exports.updateInternship = exports.getInternship = exports.getInternships = exports.createInternship = void 0;
const data_source_1 = require("../data-source");
const Internship_1 = require("../models/Internship");
const internshipvalidation_1 = require("../validation/internshipvalidation");
const internshipRepository = data_source_1.AppDataSource.getRepository(Internship_1.Internship);
const createInternship = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = internshipvalidation_1.createInternshipSchema.validate(req.body);
        if (error)
            return res.status(400).json({ message: error.details[0].message });
        const internship = internshipRepository.create(req.body);
        yield internshipRepository.save(internship);
        res.status(201).json(internship);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createInternship = createInternship;

const getInternships = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const internships = yield internshipRepository.find();
        res.json(internships);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getInternships = getInternships;

const getInternship = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const internship = yield internshipRepository.findOne({
            where: { id: parseInt(req.params.id, 10) }
        });
        if (!internship)
            return res.status(404).json({ message: 'Internship not found' });
        res.json(internship);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getInternship = getInternship;
const updateInternship = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = internshipvalidation_1.updateInternshipSchema.validate(req.body);
        if (error)
            return res.status(400).json({ message: error.details[0].message });
        const internship = yield internshipRepository.findOneBy({ id: parseInt(req.params.id, 10) });
        if (!internship)
            return res.status(404).json({ message: 'Internship not found' });
        internshipRepository.merge(internship, req.body);
        yield internshipRepository.save(internship);
        res.json(internship);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateInternship = updateInternship;
const deleteInternship = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const internship = yield internshipRepository.findOneBy({ id: parseInt(req.params.id, 10) });
        if (!internship)
            return res.status(404).json({ message: 'Internship not found' });
        yield internshipRepository.remove(internship);
        res.json({ message: 'Internship deleted' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteInternship = deleteInternship;
