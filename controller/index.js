const Data = require('../database/models/data')
const TransactionDescription = require('../database/models/transactionDescription')
const { formattedTimestamp } = require('../utils/timestamp')

const addData = async (req, res) => {
    try {
        if (req.user === "invalidToken") {
            return res.status(200).json({
                success: false,
                statusCode: 401, message: "unauthorized"
            })
        }
        const { _id } = req.user
        const { amount, transactionType, transactionDescription, month, year } = req.body
        const transaction = await new Data({
            userId: _id,
            amount,
            transactionType: transactionType.toLowerCase(),
            transactionDescription: transactionDescription.toLowerCase(),
            month: month.toLowerCase(),
            year,
            timestamp: formattedTimestamp
        })
        await transaction.save()
        const _transactionDescription = await TransactionDescription.findOne({ userId: _id, title: transactionDescription.toLowerCase() })
        if (!_transactionDescription) {
            const newDescription = await new TransactionDescription({
                title: transactionDescription.toLowerCase(),
                count: 1,
                userId: _id,
                timestamp: formattedTimestamp
            })
            await newDescription.save()
        }
        else {
            _transactionDescription.count = _transactionDescription.count + 1
            _transactionDescription.save()
        }
        return res.status(201).json({
            statusCode: 201,
            success: true,
            message: "Data Added Successfully.",
            data: transaction
        })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

const getAllTransactionDescriptions = async (req, res) => {
    try {
        if (req.user === "invalidToken") {
            return res.status(200).json({
                success: false,
                statusCode: 401, message: "unauthorized"
            })
        }
        const { _id } = req.user
        const _transactionDescription = await TransactionDescription.find({ userId: _id })
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "All Transaction Description.",
            count: _transactionDescription.length,
            data: _transactionDescription
        })

    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

const getAllData = async (req, res) => {
    try {
        if (req.user === "invalidToken") {
            return res.status(200).json({
                success: false,
                statusCode: 401, message: "unauthorized"
            })
        }
        const { _id } = req.user
        const _data = await Data.find({ userId: _id })
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "All Data.",
            count: _data.length,
            data: _data
        })

    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

const deleteTransaction = async (req, res) => {
    try {
        if (req.user === "invalidToken") {
            return res.status(200).json({
                success: false,
                statusCode: 401, message: "unauthorized"
            })
        }
        const id = req.params.id
        const data = await Data.findByIdAndDelete(id)
        return res.status(200).json({
            statusCode: 200,
            success: true,
            data: data
        })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = { addData, getAllData, getAllTransactionDescriptions, deleteTransaction }