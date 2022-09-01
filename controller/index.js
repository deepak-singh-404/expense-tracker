const Data = require('../database/models/data')
const Category = require('../database/models/category')
const { formattedTimestamp } = require('../utils/timestamp')

const addData = async (req, res) => {
    try {
        const { _id } = req.user
        const { amount, transactionType, description, month, year, category, paymentMode, paymentModePlatfrom } = req.body
        const _transactionDescription = await Category.findOne({ userId: _id, _id:  category})
        if (_transactionDescription) {
            _transactionDescription.count = _transactionDescription.count + 1
            _transactionDescription.total = _transactionDescription.total + Number(amount)
            await _transactionDescription.save()
        }
        const transaction = await new Data({
            userId: _id,
            amount,
            description: description,
            transactionType: transactionType.toLowerCase(),
            category: category,
            month: month.toLowerCase(),
            year,
            paymentMode: paymentMode.toLowerCase(),
            paymentModePlatfrom: paymentModePlatfrom.toLowerCase(),
            timestamp: formattedTimestamp
        })
        await transaction.save()
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

const getAllCategories = async (req, res) => {
    try {
        const { _id } = req.user
        const categories = await Category.find({ userId: _id }).sort({ timestamp: -1 })
        const dataOfCurrentMonth = []
        for (const data of categories){
            let date = data?.timestamp.split(" ")[0]
            if(new Date(date).getMonth() == new Date().getMonth()){
                dataOfCurrentMonth.push(data)
            }
        }
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "All Categories.",
            count: dataOfCurrentMonth.length,
            data: dataOfCurrentMonth
        })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

const monthNames = ["january", "february", "march", "april", "may", "june",
    "july", "ugust", "september", "october", "november", "december"
];

const getAllData = async (req, res) => {
    try {
        const { _id } = req.user
        let _data = null
        if (req.query.month){
            _data = await Data.find({ userId: _id, month: req.query.month}).sort({ timestamp: -1 }).populate('category')
        }
        else{
            _data = await Data.find({ userId: _id}).sort({ timestamp: -1 }).populate('category')
        }
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

const addCategory = async (req, res) => {
    try {
        const { title } = req.body
        const _transactionDescription = await Category.findOne({ userId: req.user.id, title: title.toLowerCase() })
        if (!_transactionDescription) {
            const newDescription = await new Category({
                title: title.toLowerCase(),
                count: 0,
                userId: req.user.id,
                timestamp: formattedTimestamp
            })
            await newDescription.save()
            return res.status(201).json({
                statusCode: 200,
                success: true,
                message: "Added Successfully.",
                data: newDescription
            })
        }
        else {
            return res.status(200).json({
                statusCode: 409,
                success: false,
                message: "Already Added.",
                data: null
            })
        }
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = { addData, getAllData, getAllCategories, deleteTransaction, addCategory }